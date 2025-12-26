import React, { JSX } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routesMap';
import { useAuth } from '../hooks/useAuth';
import { Detail } from '../types/post';
import { CommentDetail } from '../types/comments';
import { formatStringForDate } from '../utils/dateFormat';
import TagCategory from '../components/text/tagCategory';
import { ArrowLeft } from 'phosphor-react-native';
import CommentCard from '../components/cards/CommentCard';

export default function PostDetailScreen(): JSX.Element {
  const navigation = useNavigation<any>();
  const { isLoggedIn } = useAuth();
  const route = useRoute<any>();
  
  const detail: Detail | undefined = route?.params?.detail as Detail | undefined;
  const comments: CommentDetail[] = route?.params?.comments || [];

  const handleBack = () => {
    navigation.replace(Routes.POSTS.name);
  };

  if (!detail) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Erro ao carregar o Post</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bgGray">
      <View className="p-2 mt-[100px] mx-5 rounded-md bg-white shadow-sm mb-10">
        <View className="p-4">
          <View className="flex-row items-center justify-between w-full">
            <Pressable onPress={handleBack} className="flex-row items-center">
              <ArrowLeft size={20} color="#6B7280" />
              <Text className="text-textGray text-lg font-bold ml-2">Posts</Text>
            </Pressable>
            <TagCategory category={detail.category_name} isLeft={false} />
          </View>

          <Text className="text-2xl font-bold text-gray-800 mt-4">{detail.title}</Text>
          <Text className="text-gray-500 mt-2 mb-4">
            Por Profª {detail.user_name} {'\u25CF'} {formatStringForDate(detail.created_at)}
          </Text>

          <Text className="text-lg leading-relaxed text-gray-800 mb-6">{detail.content}</Text>

          <View className="border-t border-gray-100 pt-6 mb-4">
            <Text className="text-xl font-bold text-gray-800">Comentários ({comments.length})</Text>
          </View>

          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}

          {!isLoggedIn && (
            <View className="mt-6">
              <TouchableOpacity 
                className="bg-alert h-12 rounded-lg items-center justify-center"
                onPress={() => navigation.navigate(Routes.SIGN_IN.name)}
              >
                <Text className="text-white font-semibold">Faça login para comentar neste Post.</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}