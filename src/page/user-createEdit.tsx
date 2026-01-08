import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Eye, EyeSlash } from 'phosphor-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ScreenWrapper } from '../components/screens/screenWrapper';
import { maskPhone } from '../utils/phoneFormat';
import { create, update } from '../services/userService';
import { User } from '../types/user';

type RootStackParamList = {
  Users: { refresh?: boolean };
  UserCreateEdit: { userData: User | null };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type UserRouteProp = RouteProp<RootStackParamList, 'UserCreateEdit'>;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome muito curto')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
  password: Yup.string().when('$isCreate', {
    is: true,
    then: schema =>
      schema.min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
    otherwise: schema => schema.optional(),
  }),
});

const UserCreateEdit: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<UserRouteProp>();

  const userData = route.params?.userData ?? null;
  const isEdit = !!userData;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [roleType, setRoleType] = useState<
    'aluno' | 'coordenador' | 'professor'
  >(() => {
    if (userData?.role_name === 'student') return 'aluno';
    if (userData?.role_name === 'coordinator') return 'coordenador';
    return 'professor';
  });

  const handleFormSubmit = async (values: any) => {
    try {
      setLoading(true);

      const roleMapping = {
        aluno: 'student',
        coordenador: 'coordinator',
        professor: 'teacher',
      };

      const payload: any = {
        name: values.name,
        email: values.email,
        phone: values.phone.replace(/\D/g, ''),
        role_name: roleMapping[roleType],
      };

      if (isEdit && userData) {
        await update({ id: userData.id, ...payload });
      } else {
        payload.password = values.password;
        await create(payload);
      }

      Alert.alert(
        'Sucesso',
        isEdit ? 'Usuário atualizado!' : 'Usuário criado!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Users', { refresh: true }),
          },
        ]
      );
    } catch (err: any) {
      Alert.alert('ERRO', err.message || 'Erro ao processar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-bgGray mt-[15px]"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="my-5 mx-5 p-2 rounded-xl bg-white border border-gray-100 shadow-sm">
            <View className="p-4">
              <View className="flex-row items-center w-full mb-6">
                <Pressable
                  onPress={() => navigation.goBack()}
                  className="flex-row items-center"
                >
                  <ArrowLeft size={22} color="#4B5563" weight="bold" />
                  <Text className="text-gray-600 text-lg font-semibold ml-2">
                    Voltar
                  </Text>
                </Pressable>
              </View>

              <View className="mb-2">
                <Text className="text-2xl font-extrabold text-gray-900">
                  {isEdit ? 'Editar Usuário' : 'Novo Usuário'}
                </Text>
              </View>

              <View className="mb-6">
                <Text className="text-sm font-semibold text-textGray leading-5">
                  {isEdit
                    ? `Editando perfil de: ${userData?.name}`
                    : 'Preencha os dados para criar um novo acesso.'}
                </Text>
              </View>

              <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
                {(['aluno', 'coordenador', 'professor'] as const).map(type => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setRoleType(type)}
                    className={`flex-1 py-3 items-center rounded-lg ${roleType === type ? 'bg-primary' : ''}`}
                  >
                    <Text
                      className={`text-[11px] font-bold capitalize ${roleType === type ? 'text-white' : 'text-gray-500'}`}
                      numberOfLines={1}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Formik
                initialValues={{
                  name: userData?.name || '',
                  email: userData?.email || '',
                  phone: maskPhone(userData?.phone || ''),
                  password: '',
                }}
                validationSchema={validationSchema}
                validateContext={{ isCreate: !isEdit }}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <View className="mb-5">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        Nome Completo *
                      </Text>
                      <TextInput
                        className={`bg-gray-50 border rounded-xl p-4 text-base text-gray-800 ${touched.name && errors.name ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Ex: João Silva"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                      {touched.name && errors.name && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                          {errors.name}
                        </Text>
                      )}
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        E-mail *
                      </Text>
                      <TextInput
                        className={`bg-gray-50 border rounded-xl p-4 text-base text-gray-800 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="exemplo@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      {touched.email && errors.email && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                          {errors.email}
                        </Text>
                      )}
                    </View>

                    <View className="mb-5">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        Telefone *
                      </Text>
                      <TextInput
                        className={`bg-gray-50 border rounded-xl p-4 text-base text-gray-800 ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="(00) 00000-0000"
                        keyboardType="phone-pad"
                        onChangeText={t => setFieldValue('phone', maskPhone(t))}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        maxLength={15}
                      />
                      {touched.phone && errors.phone && (
                        <Text className="text-red-500 text-xs mt-1 ml-1">
                          {errors.phone}
                        </Text>
                      )}
                    </View>

                    {!isEdit && (
                      <View className="mb-8">
                        <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                          Senha *
                        </Text>
                        <View className="relative flex-row items-center">
                          <TextInput
                            className={`flex-1 bg-gray-50 border rounded-xl p-4 pr-14 text-base text-gray-800 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="••••••••"
                            secureTextEntry={!showPassword}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                          />
                          <TouchableOpacity
                            className="absolute right-0 w-14 h-full items-center justify-center"
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Eye size={22} color="#6B7280" />
                            ) : (
                              <EyeSlash size={22} color="#6B7280" />
                            )}
                          </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                          <Text className="text-red-500 text-xs mt-1 ml-1">
                            {errors.password}
                          </Text>
                        )}
                      </View>
                    )}

                    <TouchableOpacity
                      disabled={loading}
                      activeOpacity={0.8}
                      onPress={() => handleSubmit()}
                      className={`bg-primary py-4 rounded-xl items-center shadow-md ${loading ? 'opacity-50' : ''}`}
                    >
                      {loading ? (
                        <ActivityIndicator color="#FFF" />
                      ) : (
                        <Text className="text-white text-lg font-black">
                          {isEdit ? 'Salvar Alterações' : 'Criar Conta'}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default UserCreateEdit;
