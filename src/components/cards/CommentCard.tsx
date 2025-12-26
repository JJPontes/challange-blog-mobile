import React from 'react';
import { View, Text } from 'react-native';
import { CommentDetail } from '../../types/comments';
import { formatStringForDate } from '../../utils/dateFormat';

interface Props {
  comment: CommentDetail;
}

export default function CommentCard({ comment }: Props) {
  return (
    <View className="bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-bold text-gray-800 text-sm">
          {comment.author}
        </Text>
        <Text className="text-xs text-gray-400">
          {formatStringForDate(comment.created_at)}
        </Text>
      </View>
      <Text className="text-sm text-gray-700 leading-5">
        {comment.content}
      </Text>
    </View>
  );
}