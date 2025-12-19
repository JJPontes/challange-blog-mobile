import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { sendLogin } from '../services/authServices';
import { Routes } from '../constants/routesMap';
import type { LoginRequest } from '../types/auth';

type NavigationProps = NativeStackNavigationProp<any>;

// 1. Importação dos ícones do Phosphor
import { Eye, EyeSlash } from 'phosphor-react-native';

const { height } = Dimensions.get('window');

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('O email de usuário é obrigatório')
      .email('Digite um email válido'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    alert('Teste de alerta');
    try {
      const response = await sendLogin(values);
      alert('Login bem-sucedido');
      login(response.data);
      setHasError(false);
      return navigation.navigate(Routes.POSTS.name);
    } catch {
      setHasError(true);
      alert('Login mal-sucedido');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{
          minHeight: height - 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View className="bg-white rounded-lg p-6 w-full max-w-sm self-center">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Entrar</Text>

          <Text className="text-textGray mb-6">
            Acesse com sua conta de professor ou estudante.
          </Text>

          {hasError && (
            <View className="bg-dangerous rounded-xl p-3 mb-6">
              <Text className="text-white text-sm font-bold text-center">
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

          <View style={styles.passwordContainer}>
            <TextInput
              className="h-12 border border-gray-300 rounded-md px-4 text-base focus:border-blue-500"
              style={styles.passwordInput}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={togglePasswordVisibility}
            >
              {/* 2. Uso do componente Phosphor (Eye ou EyeSlash) */}
              {isPasswordVisible ? (
                <Eye size={20} color="#6B7280" weight="bold" />
              ) : (
                <EyeSlash size={20} color="#6B7280" weight="bold" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 24 }} />

          <TouchableOpacity
            className="bg-blue-600 rounded-md h-10 px-6 items-center justify-center"
            onPress={() => handleSubmit({ username: email, password })}
          >
            <Text className="text-white text-base font-semibold">Entrar</Text>
          </TouchableOpacity>
          <View className="flex-row justify-between items-center mt-2">
            <TouchableOpacity className="self-start">
              <Text className="text-blue-600 font-semibold text-sm">
                Esqueci minha{'\n'}senha
              </Text>
            </TouchableOpacity>
            <Text className="text-sm text-textGray ml-5">
              Apenas usuários autorizados{'\n'} podem acessar.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50, // Espaço para o ícone
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
