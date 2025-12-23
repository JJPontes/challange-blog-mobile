import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { UserCircleIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';
// Supondo que você tenha um hook para lidar com a autenticação:
import { useAuth } from '../../hooks/useAuth';

type NavigationProps = NativeStackNavigationProp<any>;

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  const { logout, isLoggedIn } = useAuth();
  // const { logout } = useAuth(); // Descomente se tiver o hook de autenticação

  // 1. Função de Ação para 'Perfil' (mantida como Alert por enquanto)
  const handlePress = (action: string, event?: GestureResponderEvent) => {
    Alert.alert('Ação Pressionada', `Você clicou em: ${action}`, [
      { text: 'OK' },
    ]);
  };

  // 2. NOVA FUNÇÃO: Lógica para Sair (Logout)
  const handleLogout = () => {
    // --- PASSO 1: Chamar a função de Logout ---
    // Esta função deve limpar o token do usuário, redefinir o estado de autenticação, etc.
    logout(); // Descomente para executar o logout real

    // --- PASSO 2: Navegar para a tela de Login (SignIn) ---
    // Usamos a constante de rota (Routes.SIGN_IN.name)
    // Usamos 'replace' em vez de 'navigate' para limpar a pilha de navegação
    // e impedir que o usuário volte para as telas autenticadas (como Dashboard)
    navigation.replace(Routes.SIGN_IN.name);
  };

  return (
    <View className="bg-bgGray py-1 px-3 flex-row rounded-2xl">
      <View className="flex-row items-center gap-2">
        <UserCircleIcon size={40} />
      </View>
      <View className="flex-col ml-3">
        <View className="flex-row gap-2">
          <Text className="text-black text-xl font-bold">Prof Ana</Text>
        </View>
        <View className="flex-row items-center gap-2 justify-between">
          <Pressable onPress={event => handlePress('Perfil', event)}>
            <Text className="text-textGray text-lg font-bold">Perfil</Text>
          </Pressable>
          <Text className="text-textGray">{'\u25CF'}</Text>

          {/* Implementação do Botão Sair com a nova função */}
          <Pressable onPress={handleLogout}>
            <Text className="text-textGray text-lg font-bold">{isLoggedIn ? 'Sair' : 'Entrar'} </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Menu;
