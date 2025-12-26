import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Post } from '../types/post';
import BaseLayout from '../layout/base';
import CommentSection from '../components/comment-section';

export default function PostDetails() {
  const route = useRoute();
  const { post } = route.params as { post: Post };

  return (
    <BaseLayout>
      <ScrollView className="flex-1 bg-white">
        <View className="p-5">
          <Text className="text-2xl font-bold text-[#333] mb-2">{post.title}</Text>
          <Text className="text-base text-[#666] mb-1">Por: {post.author.name}</Text>
          <Text className="text-sm text-[#999] mb-5">
            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </Text>
          <View className="h-[1px] bg-[#eee] mb-5" />
          <Text className="text-lg leading-7 text-[#444]">{post.content}</Text>
        </View>

        <CommentSection />
      </ScrollView>
    </BaseLayout>
  );
}