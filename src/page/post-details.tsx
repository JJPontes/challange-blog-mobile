import React, { JSX, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'phosphor-react-native';

import { Routes } from '../constants/routesMap';
import { useAuth } from '../contexts/AuthContext';
import { Detail } from '../types/post';
import { formatStringForDate } from '../utils/dateFormat';
import TagCategory from '../components/text/tagCategory';
import { ScreenWrapper } from '../components/screens/screenWrapper';
import CommentSection from '../components/comment/comment-section';
import { getCommentsByPostId } from '@/src/services/postServices';
import { CommentDetail } from '../types/comments';

type NavigationProps = NativeStackNavigationProp<any>;

export default function PostDetailScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const { isLoggedIn } = useAuth();
  const route = useRoute<any>();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentDetail[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const detail: Detail | undefined = route?.params?.detail as
    | Detail
    | undefined;

  const loadComments = useCallback(async () => {
    if (!detail?.id) return;

    try {
      setLoadingComments(true);
      const response = await getCommentsByPostId(detail.id);

      const data = response.data;

      if (data && Array.isArray(data.details)) {
        setComments(data.details);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  }, [detail?.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleBack = () => {
    navigation.replace(Routes.POSTS.name);
  };

  if (!detail) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2 text-gray-500">Carregando post...</Text>
      </View>
    );
  }

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
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1 bg-bgGray"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="p-2 my-10 mx-5 rounded-md bg-white">
            <View className="p-4">
              <View className="flex-row items-center justify-between w-full">
                <Pressable
                  onPress={handleBack}
                  className="flex-row items-center"
                >
                  <ArrowLeft size={20} color="#6B7280" />
                  <Text className="text-textGray text-lg font-bold ml-2">
                    Posts
                  </Text>
                </Pressable>
                <TagCategory category={detail.category_name} isLeft={false} />
              </View>

              <Text className="text-2xl font-bold text-gray-800 mt-4">
                {detail.title}
              </Text>
              <Text className="text-gray-500 mt-2">
                Por Profª {detail.user_name} {'\u25CF'}{' '}
                {formatStringForDate(detail.created_at)}
              </Text>
              <Text className="text-lg leading-relaxed text-gray-800 mt-6">
                {detail.content}
              </Text>

              <View className="border-t border-gray-200 mt-8 pt-4">
                <Text className="text-xl font-bold">
                  Comentários ({comments.length})
                </Text>
              </View>

              {/* Lógica de Adicionar Comentário */}
              {isLoggedIn ? (
                <View className="my-6">
                  {!showComments ? (
                    <TouchableOpacity
                      onPress={() => setShowComments(true)}
                      className="bg-primary h-12 rounded-lg items-center justify-center"
                    >
                      <Text className="text-white font-semibold">Comentar</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="mt-2">
                      <View className="flex-row justify-end mb-2">
                        <TouchableOpacity
                          onPress={() => setShowComments(false)}
                        >
                          <Text className="text-red-500 font-medium">
                            Cancelar
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <CommentSection
                        id={detail.id}
                        onCommentPosted={() => {
                          loadComments(); // Recarrega a lista após gravar
                          setShowComments(false); // Fecha o formulário
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : (
                <View className="my-8 p-4 bg-gray-100 rounded-lg">
                  <Text className="text-gray-500 text-center italic">
                    Faça login para comentar neste post.
                  </Text>
                </View>
              )}

              <View className="mt-2">
                {loadingComments ? (
                  <ActivityIndicator
                    size="small"
                    color="#000"
                    className="my-4"
                  />
                ) : (
                  comments.map(item => (
                    <View
                      key={item.id}
                      className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <View className="flex-row justify-between mb-1">
                        <Text className="font-bold text-gray-700">
                          {item.author}
                        </Text>
                        <Text className="text-gray-400 text-[10px]">
                          {formatStringForDate(item.created_at)}
                        </Text>
                      </View>
                      <Text className="text-gray-600">{item.content}</Text>
                    </View>
                  ))
                )}
                {!loadingComments && comments.length === 0 && (
                  <Text className="text-gray-400 text-center italic mt-4">
                    Nenhum comentário ainda.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
