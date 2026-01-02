import React from 'react';
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
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'phosphor-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';

type RootStackParamList = {
  PostCreateEdit: { id: string | null };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type PostCreateEditRouteProp = RouteProp<RootStackParamList, 'PostCreateEdit'>;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .required('O título é obrigatório'),
  content: Yup.string()
    .min(20, 'O conteúdo deve ter pelo menos 20 caracteres')
    .required('O conteúdo é obrigatório'),
});

const PostCreateEdit: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<PostCreateEditRouteProp>();
  const { user } = useAuth();

  const id = route.params?.id ?? null;

  const handleFormSubmit = async (values: { title: string; content: string }) => {
    try {
      const payload = {
        ...values,
        is_active: true,
        user_id: user?.id,
        id: id,
      };
      
      console.log('Payload:', payload);
      Alert.alert('Sucesso', id ? 'Post atualizado!' : 'Post criado!');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('ERRO', err.message || 'Erro ao processar post');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
              Platform.OS === 'ios' || Platform.OS === 'android'
                ? 'padding'
                : 'height'
            }
            keyboardVerticalOffset={
              Platform.OS === 'ios' || Platform.OS === 'android' ? 32 : 20
            }
      className="flex-1 bg-bgGray mt-[40px]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        <View className="mt-24 mx-5 p-2 rounded-md bg-white shadow-sm">
          <View className="p-4">
            
            <View className="flex-row items-center w-full mb-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="flex-row items-center p-1"
              >
                <ArrowLeft size={20} color="#6B7280" />
                <Text className="text-textGray text-lg font-bold ml-2">
                  Posts
                </Text>
              </Pressable>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-900">
                {id ? 'Editar Post' : 'Nova Postagem'}
              </Text>
              <Text className="text-sm pt-2 font-semibold text-textGray leading-5">
                {id ? 'Edite o ' : 'Crie um novo '}
                conteúdo para seus estudantes. Campos marcados com * são obrigatórios.
              </Text>
            </View>

            <Formik
              initialValues={{ title: '', content: '' }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  
                  <View className="mb-5">
                    <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                      Título *
                    </Text>
                    <TextInput
                      className={`bg-gray-50 border rounded-md p-4 text-base text-gray-800 ${
                        touched.title && errors.title
                          ? 'border-red-500'
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Ex: A arte de contar"
                      placeholderTextColor="#9ca3af"
                      onChangeText={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                    />
                    {touched.title && errors.title && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.title}
                      </Text>
                    )}
                  </View>

                  <View className="mb-6">
                    <Text className="text-md font-bold text-gray-700 mb-2 ml-1">
                      Conteúdo *
                    </Text>

                    <View className="relative">
                      <TextInput
                        className={`bg-gray-50 border rounded-md p-4 pb-10 text-base text-gray-800 ${
                          touched.content && errors.content
                            ? 'border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="Escreva o conteúdo aqui..."
                        placeholderTextColor="#9ca3af"
                        onChangeText={handleChange('content')}
                        onBlur={handleBlur('content')}
                        value={values.content}
                        multiline={true}
                        numberOfLines={8}
                        maxLength={200}
                        textAlignVertical="top"
                        style={{ minHeight: 160 }}
                      />

                      <View className="absolute bottom-2 right-3">
                        <Text
                          className={`text-xs font-medium ${
                            values.content.length >= 200
                              ? 'text-red-500'
                              : 'text-gray-400'
                          }`}
                        >
                          {values.content.length}/200
                        </Text>
                      </View>
                    </View>

                    {touched.content && errors.content && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.content}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    activeOpacity={0.7}
                    className="bg-primary py-4 rounded-md items-center shadow-md active:bg-blue-700"
                  >
                    <Text className="text-white text-lg font-bold">
                      {id ? 'Salvar Alterações' : 'Publicar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PostCreateEdit;