import React, { JSX, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';


interface ContentSection {
  type: 'heading' | 'paragraph';
  text: string;
}

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  contentSections: ContentSection[];
  comments: Comment[];
  totalComments: number;
}

export default function PostDetailScreen(): JSX.Element {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fakePostData: Post = {
    id: 1,
    title: 'Introdução à Revolução Industrial',
    author: 'Profª Ana Souza',
    date: '18 de março de 2025',
    category: 'História',
    imageUrl:
      'https://images.unsplash.com/photo-1581091870627-3a2c1a6c1f0c',
    contentSections: [
      {
        type: 'paragraph',
        text:
          'Nesta aula vamos compreender o contexto histórico que levou ao surgimento da Revolução Industrial.'
      },
      { type: 'heading', text: '1. Contexto histórico' },
      {
        type: 'paragraph',
        text:
          'No final do século XVIII, a Inglaterra vivia profundas transformações económicas.'
      },
      { type: 'heading', text: '2. Impactos sociais' },
      {
        type: 'paragraph',
        text:
          'A urbanização acelerada e as duras condições de trabalho marcaram este período.'
      }
    ],
    comments: [
      {
        id: 1,
        author: 'João Silva',
        date: '18 de março de 2025 • 19:42',
        text:
          'Professora, pode explicar melhor a diferença entre artesanato e manufatura?'
      },
      {
        id: 2,
        author: 'Profª Ana Souza',
        date: '18 de março de 2025 • 20:06',
        text:
          'Excelente questão! Vamos aprofundar isso na próxima aula.'
      }
    ],
    totalComments: 12
  };

  useEffect(() => {
    setTimeout(() => {
      setPost(fakePostData);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-500">
          A carregar conteúdo...
        </Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          {error ?? 'Erro ao carregar o post'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-xs font-bold text-blue-600 uppercase">
          {post.category}
        </Text>

        <Text className="text-2xl font-bold text-gray-800 mt-1">
          {post.title}
        </Text>

        <Text className="text-gray-500 mt-2">
          Postado por <Text className="font-semibold">{post.author}</Text> em{' '}
          {post.date}
        </Text>

        <Image
          source={{ uri: post.imageUrl }}
          className="w-full h-48 rounded-lg my-6"
        />

        {post.contentSections.map((section, index) => (
          <Text
            key={index}
            className={
              section.type === 'heading'
                ? 'text-lg font-bold mt-4 mb-2 text-gray-800'
                : 'text-base text-gray-700 mb-3 leading-relaxed'
            }
          >
            {section.text}
          </Text>
        ))}

        <View className="border-t border-gray-200 mt-6 pt-4">
          <Text className="text-xl font-bold">
            Comentários ({post.totalComments})
          </Text>
        </View>

       

        <View className="my-8">
          <Text className="text-center text-gray-500 mb-4">
            Faça login para comentar
          </Text>

          <TouchableOpacity className="bg-orange-600 h-12 rounded-lg items-center justify-center">
            <Text className="text-white font-semibold">
              Fazer login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
