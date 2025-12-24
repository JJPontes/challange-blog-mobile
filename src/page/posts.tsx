import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Cards from '../components/cards';
import { Detail } from '../types/post';
import { getPostById } from '../services/postServices';
import { useAuth } from '../hooks/useAuth';

export default function Posts() {
  const [posts, setPosts] = useState<Detail | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostById(
          '5b0c3a9d-dcd5-4e55-bef2-ac157d3cefe6'
        );
        const details = response.data.details;
        if (details) {
          setPosts(details as any as Detail);
        }
      } catch (err: any) {
        Alert.alert('Erro ao buscar posts:', err.message);
      } finally {
        // Qualquer ação final, se necessário
      }
    };

    fetchPosts();
  }, []);

  return (
    <View>
      <Text>Posts page</Text>
      {posts && <Cards {...posts} />}
    </View>
  );
}
