import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Eye, EyeSlash } from 'phosphor-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { maskPhone } from '../utils/phoneFormat';
import { Routes } from '../constants/routesMap';
import { create } from '../services/userService';
import { ScreenWrapper } from '../components/screens/screenWrapper';

type NavigationProp = NativeStackNavigationProp<any>;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  phone: Yup.string().optional(),
});

export default function UserCreateEdit() {
  const navigation = useNavigation<NavigationProp>();
  const [roleType, setRoleType] = useState<'professor' | 'aluno'>('professor');
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        phone: values.phone.replace(/\D/g, ''),
        roleName: roleType === 'aluno' ? 'student' : 'teacher',
      };

      const response = await create(payload);
      if (response?.data) {
        navigation.navigate(Routes.POSTS.name);
      }
    } catch (err: any) {
      Alert.alert('ERRO', err.message || 'Erro ao criar usuário');
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        className="flex-1 bg-bgGray"
        behavior={
          Platform.OS === 'ios' || Platform.OS === 'android'
            ? 'padding'
            : 'height'
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios' || Platform.OS === 'android' ? 32 : 20
        }
      >
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '' }}
          validationSchema={validationSchema}
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
            <ScrollView
              contentContainerClassName="flex-grow mt-[100px] pb-8 px-4"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="bg-white rounded-md p-6 w-full max-w-[500px] self-center mx-4 shadow-sm">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="flex-row items-center mb-4"
                >
                  <ArrowLeft size={20} color="#6B7280" />
                  <Text className="text-gray-500 text-lg font-semibold ml-2">
                    Voltar
                  </Text>
                </TouchableOpacity>

                <Text className="text-2xl font-bold text-gray-900 mb-4">
                  Cadastrar{' '}
                  {roleType === 'professor' ? 'professor' : 'estudante'}
                </Text>

                {/* Seletor de Cargo */}
                <View className="flex-row bg-gray-200 rounded-md p-1 mb-4">
                  {(['professor', 'aluno'] as const).map(type => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setRoleType(type)}
                      activeOpacity={0.6}
                      className={`flex-1 py-3 items-center rounded-lg ${roleType === type ? 'bg-primary' : ''}`}
                    >
                      <Text
                        className={`text-base font-bold capitalize ${roleType === type ? 'text-white' : 'text-gray-500'}`}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Input Nome */}
                <View className="mb-4">
                  <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                    Nome completo
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-md p-4 text-base text-gray-800 focus:border-blue-500"
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

                {/* Input Email */}
                <View className="mb-4">
                  <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                    E-mail
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-md p-4 text-base text-gray-800 focus:border-blue-500"
                    placeholder="exemplo@escola.com"
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

                {/* Input Telefone com Máscara */}
                <View className="mb-4">
                  <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                    Telefone
                  </Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-300 rounded-md p-4 text-base text-gray-800 focus:border-blue-500"
                    placeholder="(00) 00000-0000"
                    keyboardType="phone-pad"
                    maxLength={15}
                    value={values.phone}
                    onBlur={handleBlur('phone')}
                    onChangeText={text => {
                      const formatted = maskPhone(text);
                      if (formatted !== values.phone) {
                        setFieldValue('phone', formatted);
                      }
                    }}
                  />
                  {touched.phone && errors.phone && (
                    <Text className="text-red-500 text-xs mt-1 ml-1">
                      {errors.phone}
                    </Text>
                  )}
                </View>

                <View className="mb-8">
                  <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                    Senha
                  </Text>
                  <View className="relative flex-row items-center">
                    <TextInput
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-4 pr-14 text-base text-gray-800 focus:border-blue-500"
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

                <TouchableOpacity
                  className="bg-primary py-4 rounded-md items-center shadow-sm active:bg-blue-700"
                  onPress={() => handleSubmit()}
                >
                  <Text className="text-white text-lg font-bold">
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
