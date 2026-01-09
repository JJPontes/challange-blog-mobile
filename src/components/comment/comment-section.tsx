import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CreateComment } from '@/src/types/comments';
import { insertComment } from '@/src/services/postServices';
import { useAuth } from '@/src/contexts/AuthContext';

const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, 'Comentário muito curto')
    .max(200, 'Limite de 200 caracteres atingido')
    .required('O comentário não pode estar vazio'),
});

// Adicionamos a prop onCommentPosted para atualizar a lista no pai
interface CommentSectionProps {
  id: string;
  onCommentPosted: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  id,
  onCommentPosted,
}) => {
  const { user } = useAuth();

  const handlePostComment = async (
    values: { content: string },
    { resetForm, setSubmitting }: any
  ) => {
    try {
      const payload: CreateComment = {
        id: id, // Certifique-se que este é o ID do POST esperado pela API
        content: values.content,
        author: user?.name || 'Anonymous',
      };

      const response = await insertComment(payload);

      if (response) {
        Alert.alert('Sucesso', 'Comentário enviado!');
        resetForm();
        onCommentPosted(); // Chama a função para recarregar a lista no componente pai
      }
    } catch (error) {
      console.error('Erro ao postar comentário:', error);
      Alert.alert(
        'Erro',
        'Não foi possível gravar seu comentário. Tente novamente.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="mt-4">
      <Text className="text-xl font-bold mb-4">Adicionar comentário</Text>

      <Formik
        initialValues={{ content: '' }}
        validationSchema={CommentSchema}
        onSubmit={handlePostComment}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <View className="mb-4">
              <View className="relative">
                <TextInput
                  className={`bg-gray-50 border rounded-xl p-4 pb-12 text-base text-gray-800 ${
                    touched.content && errors.content
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }`}
                  placeholder="Escreva seu comentário aqui..."
                  placeholderTextColor="#9CA3AF"
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                  value={values.content}
                  multiline
                  maxLength={200}
                  textAlignVertical="top"
                  style={{ minHeight: 150 }}
                />

                <View className="absolute bottom-3 right-4 bg-white/80 px-2 py-1 rounded-md border border-gray-100">
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
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              className={`h-12 rounded-xl items-center justify-center ${isSubmitting ? 'bg-gray-400' : 'bg-primary'}`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">
                  Postar Comentário
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CommentSection;
