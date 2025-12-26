import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routesMap';

export default function CommentSection() {
  const navigation = useNavigation<any>();
  const [comment, setComment] = useState('');

  const handleLoginPress = () => {
    navigation.navigate(Routes.SIGN_IN.name);
  };

  return (
    <View className="p-4 bg-[#F8F9FA]">
      <View className="bg-white rounded-lg p-4 border border-[#E1E4E8] mb-4">
        <Text className="text-[15px] font-bold mb-3 text-[#1A1A1A]">Adicionar comentário</Text>
        <View className="bg-[#F6F8FA] rounded-md p-3">
          <TextInput
            className="text-sm text-[#24292E] min-h-[100px] mb-2"
            style={{ textAlignVertical: 'top' }}
            placeholder="Escreva aqui sua dúvida ou contribuição..."
            placeholderTextColor="#6A737D"
            multiline
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity 
            className={`bg-[#0056D2] self-end py-2 px-5 rounded-md ${!comment ? 'opacity-60' : ''}`}
            onPress={() => comment && Alert.alert("Sucesso", "Comentário enviado!")}
          >
            <Text className="text-white font-bold text-sm">Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        className="bg-[#FF7A00] p-4 rounded-md items-center" 
        onPress={handleLoginPress}
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-sm">
          Faça login para comentar neste post.
        </Text>
      </TouchableOpacity>
    </View>
  );
}