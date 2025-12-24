import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Post } from '../types/post';
import BaseLayout from '../layout/base';
import CommentSection from '../components/comment-section';

export default function PostDetails() {
  const route = useRoute();
  const { post } = route.params as { post: Post };

  return (
    <BaseLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.author}>Por: {post.author.name}</Text>
          <Text style={styles.date}>
            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.body}>{post.content}</Text>
        </View>

        <CommentSection />
        
      </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    lineHeight: 28,
    color: '#444',
  },
});