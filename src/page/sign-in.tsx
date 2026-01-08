import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { sendLogin } from '../services/authServices';
import { Routes } from '../constants/routesMap';
import type { LoginRequest } from '../types/auth';
import { Eye, EyeSlash } from 'phosphor-react-native';

type NavigationProps = NativeStackNavigationProp<any>;

const { height } = Dimensions.get('window');

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigation = useNavigation<NavigationProps>();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await sendLogin(values);
      if (response && response.data) {
        await login(response.data);
        setHasError(false);
        navigation.navigate(Routes.POSTS.name);
      } else {
        throw new Error('Dados de resposta vazios');
      }
    } catch (err: any) {
      setHasError(true);
      Alert.alert('ERRO DE CONEXÃO', err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' || Platform.OS === 'android'
          ? 'padding'
          : 'height'
      }
      keyboardVerticalOffset={
        Platform.OS === 'ios' || Platform.OS === 'android' ? 32 : 20
      }
      className="flex-1 bg-bgGray justify-center items-center "
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ minHeight: height }}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center p-6">
            <View className="bg-white rounded-md p-8 w-full max-w-sm">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                Entrar
              </Text>
              <Text className="text-gray-500 mb-8">
                Acesse com sua conta de professor ou estudante.
              </Text>

              {hasError && (
                <View className="bg-red-100 border border-red-200 rounded-md p-3 mb-6">
                  <Text className="text-red-600 text-sm font-semibold text-center">
                    Email ou senha inválidos.
                  </Text>
                </View>
              )}

              <View className="mb-5">
                <Text className="text-sm text-gray-700 font-bold mb-2 ml-1">
                  Email ou usuário
                </Text>
                <TextInput
                  className="w-full h-14 border border-gray-200 rounded-md px-4 text-base bg-gray-50 focus:border-blue-500 text-gray-800"
                  placeholder="seu.email@escola.edu"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mb-8">
                <Text className="text-sm text-gray-700 font-bold mb-2 ml-1">
                  Senha
                </Text>
                <View className="relative flex-row items-center">
                  <TextInput
                    className="flex-1 h-14 border border-gray-200 rounded-md px-4 pr-14 text-base bg-gray-50 focus:border-blue-500 text-gray-800"
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    className="absolute right-0 w-14 h-14 justify-center items-center"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    activeOpacity={0.6}
                  >
                    {isPasswordVisible ? (
                      <Eye size={22} color="#6B7280" />
                    ) : (
                      <EyeSlash size={22} color="#6B7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                className={`rounded-md h-14 items-center justify-center shadow-md ${
                  loading ? 'bg-blue-400' : 'bg-blue-600'
                }`}
                onPress={() => handleSubmit({ username: email, password })}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text className="text-white text-lg font-bold">Entrar</Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-between items-start mt-8">
                <TouchableOpacity className="flex-1">
                  <Text className="text-blue-600 font-bold text-sm">
                    Esqueci minha{'\n'}senha
                  </Text>
                </TouchableOpacity>

                <Text className="flex-1 text-[10px] text-gray-400 text-right leading-3">
                  Apenas usuários autorizados podem acessar o sistema.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
