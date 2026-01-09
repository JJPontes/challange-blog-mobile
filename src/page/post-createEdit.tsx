import React, { useState, useEffect } from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, CaretDown, Check } from 'phosphor-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { getAllCategories } from '../services/categoryServices';
import { Category, CategoryResponse } from '../types/category';
import { Detail, PostResponse, CreatePost, UpdatePost } from '../types/post';
import { getPostById, create, update } from '../services/postServices';
import { useTranslation } from 'react-i18next';
import { ScreenWrapper } from '../components/screens/screenWrapper';

type RootStackParamList = {
  Posts: { refresh?: boolean };
  PostCreateEdit: { id: string | null };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type PostCreateEditRouteProp = RouteProp<RootStackParamList, 'PostCreateEdit'>;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .required('O título é obrigatório'),
  category_id: Yup.string().required('Selecione uma categoria'),
  content: Yup.string()
    .min(20, 'O conteúdo deve ter pelo menos 20 caracteres')
    .max(200, 'O conteúdo não pode exceder 200 caracteres')
    .required('O conteúdo é obrigatório'),
});

const PostCreateEdit: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<PostCreateEditRouteProp>();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Detail | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const id = route.params?.id ?? null;

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      const categoriesData: CategoryResponse = response.data;
      setCategories(categoriesData.details || []);
    } catch (err: any) {
      console.error('Erro ao buscar categorias');
    }
  };

  const fetchPosts = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await getPostById(id);
      const postsData: PostResponse = response.data;

      // Ajuste para lidar com retorno em objeto ou array
      if (
        postsData.details &&
        typeof postsData.details === 'object' &&
        'id' in postsData.details
      ) {
        setPosts(postsData.details as Detail);
      } else if (
        Array.isArray(postsData.details) &&
        postsData.details.length > 0
      ) {
        setPosts(postsData.details[0]);
      }
    } catch (err: any) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da postagem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [id]);

  const handleFormSubmit = async (values: {
    title: string;
    content: string;
    category_id: string;
  }) => {
    try {
      setLoading(true);
      if (id) {
        const payload: UpdatePost = { id, ...values, is_active: true };
        await update(payload);
      } else {
        const payload: CreatePost = {
          ...values,
          is_active: true,
          user_id: user?.id || '',
        };
        await create(payload);
      }

      Alert.alert(
        'Sucesso',
        id ? 'Post atualizado!' : 'Post criado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Posts', { refresh: true }),
          },
        ]
      );
    } catch (err: any) {
      Alert.alert('ERRO', err.message || 'Erro ao processar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios' || Platform.OS === 'android'
            ? 'padding'
            : 'height'
        }
        keyboardVerticalOffset={
          Platform.OS === 'ios' || Platform.OS === 'android' ? 32 : 20
        }
        className="flex-1 bg-bgGray mt-[15px]"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="my-5 mx-5 p-2 rounded-xl bg-white border border-gray-100">
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
                  {id ? 'Editar Postagem' : 'Nova Postagem'}
                </Text>
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color="#6B7280"
                    className="mt-2 self-start"
                  />
                )}
              </View>

              <View className="mb-4">
                <Text className="text-sm font-semibold text-textGray leading-5">
                  {id ? 'Edite o ' : 'Crie um novo '} conteúdo para seus
                  estudantes.
                </Text>
                <Text className="text-sm font-semibold text-textGray leading-5">
                  Campos marcados com * são obrigatórios.
                </Text>
              </View>

              <Formik
                enableReinitialize
                initialValues={{
                  title: posts?.title || '',
                  content: posts?.content || '',
                  category_id: posts?.category_id || '',
                }}
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
                  <View>
                    <View className="mb-5">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        Título *
                      </Text>
                      <TextInput
                        className={`bg-gray-50 border rounded-xl p-4 text-base text-gray-800 ${
                          touched.title && errors.title
                            ? 'border-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Título da postagem"
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

                    <View className="mb-5">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        Disciplina *
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setIsModalVisible(true)}
                        className={`flex-row items-center justify-between bg-gray-50 border rounded-xl p-4 ${
                          touched.category_id && errors.category_id
                            ? 'border-red-500'
                            : 'border-gray-200'
                        }`}
                      >
                        <Text
                          className={`text-base capitalize ${values.category_id ? 'text-gray-800' : 'text-gray-400'}`}
                        >
                          {values.category_id
                            ? t(
                                `subjects.${categories.find(cat => cat.id === values.category_id)?.name}`
                              )
                            : 'Selecione uma disciplina...'}
                        </Text>
                        <CaretDown size={20} color="#6B7280" weight="bold" />
                      </TouchableOpacity>
                    </View>

                    <View className="mb-8">
                      <Text className="text-sm font-bold text-gray-700 mb-2 ml-1">
                        Conteúdo *
                      </Text>
                      <View className="relative">
                        <TextInput
                          className={`bg-gray-50 border rounded-xl p-4 pb-12 text-base text-gray-800 ${
                            touched.content && errors.content
                              ? 'border-red-500'
                              : 'border-gray-200'
                          }`}
                          onChangeText={handleChange('content')}
                          onBlur={handleBlur('content')}
                          value={values.content}
                          multiline
                          maxLength={200}
                          textAlignVertical="top"
                          style={{ minHeight: 180 }}
                        />
                        <View className="absolute bottom-3 right-4 bg-white/80 px-2 py-1 rounded-md">
                          <Text
                            className={`text-[10px] font-bold ${values.content.length >= 200 ? 'text-red-500' : 'text-gray-400'}`}
                          >
                            {values.content.length} / 200
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
                      disabled={loading}
                      activeOpacity={0.8}
                      onPress={() => handleSubmit()}
                      className={`bg-primary py-4 rounded-md items-center shadow-md ${loading ? 'opacity-50' : ''}`}
                    >
                      <Text className="text-white text-lg font-black">
                        {id ? 'Salvar Alterações' : 'Publicar'}
                      </Text>
                    </TouchableOpacity>

                    <Modal
                      visible={isModalVisible}
                      transparent
                      animationType="fade"
                    >
                      <Pressable
                        className="flex-1 bg-black/40 justify-end"
                        onPress={() => setIsModalVisible(false)}
                      >
                        <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl">
                          <View className="items-center mb-6">
                            <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
                          </View>
                          <Text className="text-xl font-black text-gray-900 mb-5 text-center">
                            Selecione a Disciplina
                          </Text>
                          <ScrollView className="max-h-72">
                            {categories.map(cat => {
                              const isSelected = values.category_id === cat.id;
                              return (
                                <TouchableOpacity
                                  key={cat.id}
                                  onPress={() => {
                                    setFieldValue('category_id', cat.id);
                                    setIsModalVisible(false);
                                  }}
                                  className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl ${
                                    isSelected
                                      ? 'bg-primary/10 border border-primary'
                                      : 'bg-bgGray border border-transparent'
                                  }`}
                                >
                                  <Text
                                    className={`text-base capitalize ${isSelected ? 'text-primary font-bold' : 'text-gray-700'}`}
                                  >
                                    {t(`subjects.${cat.name}`)}
                                  </Text>
                                  {isSelected && (
                                    <Check
                                      size={20}
                                      color="#3498db"
                                      weight="bold"
                                    />
                                  )}
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </Pressable>
                    </Modal>
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

export default PostCreateEdit;
