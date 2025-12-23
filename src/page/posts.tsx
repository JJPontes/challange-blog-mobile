import React from 'react';
import { View, Text } from 'react-native';
import Cards from '../components/cards';
import { Post } from '../types/post';

export default function Posts() {
  const newPosts: Post = {
    id: 'abc-123',
    title: 'Leitura obrigatória: Capítulo 2',
    content:
      'Leitura do capítulo 3 do livro didático, focando na compreensão de texto e identificação de pontos principais.',
    is_active: true,
    category_id: 'Português',
  };
  return (
    <View>
      <Text>Posts page</Text>
      <Cards {...newPosts} />
    </View>
  );
}
