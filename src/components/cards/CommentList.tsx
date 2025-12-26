import React from 'react';
import { View, Text } from 'react-native';
import { CommentDetail } from '../../types/comments';
import CommentCard from './CommentCard';

interface Props {
  comments: CommentDetail[];
}

export default function CommentList({ comments }: Props) {
  return (
    <View className="mt-4">
      {comments.length > 0 ? (
        comments.map((item) => (
          <CommentCard key={item.id} comment={item} />
        ))
      ) : (
        <Text className="text-gray-400 italic text-center my-4">
          Nenhum comentário para este post.
        </Text>
      )}
    </View>
  );
}