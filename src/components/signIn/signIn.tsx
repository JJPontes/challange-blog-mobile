import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function LoginScreenCustom() {
  const [email, setEmail] = useState('seu.email@escola.edu');
  const [password, setPassword] = useState('.........');
  const [hasError, setHasError] = useState(true);

  const handleLogin = () => {

    if (password === '12345') {
      setHasError(false);

    } else {
      setHasError(true);

    }
  };

  return (
   
    <View className="flex-1 bg-gray-100"> 
      <ScrollView 
        contentContainerStyle={{ minHeight: height }}
        className="pt-16 pb-8 px-4" 
      >
        
 
        <View className="bg-white rounded-lg p-6 shadow-md w-full max-w-sm self-center">
          
     
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Entrar
          </Text>

    
          <Text className="text-gray-500 mb-6">
            Acesse com sua conta de professor ou estudante.
          </Text>

     
          {hasError && (
            <View className="bg-red-600 rounded-md p-3 mb-6">
              <Text className="text-white font-semibold text-center">
                Email ou senha inválidos. Tente novamente.
              </Text>
            </View>
          )}

       
          <Text className="text-base text-gray-700 font-semibold mb-1">
            Email ou usuário
          </Text>
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-md px-4 mb-4 text-base focus:border-blue-500"
            placeholder="seu.email@escola.edu"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="text-base text-gray-700 font-semibold mb-1">
            Senha
          </Text>
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-md px-4 mb-6 text-base focus:border-blue-500"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
    
          <View className="flex-row justify-between items-center mt-2">
            
            <TouchableOpacity className="self-start">
              <Text className="text-blue-600 font-semibold text-base">
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-blue-600 rounded-md h-10 px-6 items-center justify-center shadow-lg"
              onPress={handleLogin}
            >
              <Text className="text-white text-base font-semibold">
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-xs text-gray-500 text-right mt-4">
              Apenas usuários autorizados podem acessar.
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}