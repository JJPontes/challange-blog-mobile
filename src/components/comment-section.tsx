import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Routes } from '../constants/routesMap';

export default function CommentSection() {
  const navigation = useNavigation<any>();
  const [comment, setComment] = useState('');

  const handleLoginPress = () => {
    navigation.navigate(Routes.SIGN_IN.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addCommentCard}>
        <Text style={styles.addTitle}>Adicionar comentário</Text>
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Escreva aqui sua dúvida ou contribuição..."
            placeholderTextColor="#6A737D"
            multiline
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity 
            style={[styles.btnComment, !comment && { opacity: 0.6 }]} 
            onPress={() => comment && Alert.alert("Sucesso", "Comentário enviado!")}
          >
            <Text style={styles.btnCommentText}>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.loginAlert} 
        onPress={handleLoginPress}
        activeOpacity={0.8}
      >
        <Text style={styles.loginAlertText}>Faça login para comentar neste post.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  addCommentCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    marginBottom: 16,
  },
  addTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputArea: {
    backgroundColor: '#F6F8FA',
    borderRadius: 6,
    padding: 12,
  },
  input: {
    fontSize: 14,
    color: '#24292E',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  btnComment: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  btnCommentText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loginAlert: {
    backgroundColor: '#FF7A00',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginAlertText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});