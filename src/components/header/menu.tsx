import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import { UserCircleIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';
import { useAuth } from '../../contexts/AuthContext';
import { truncateText } from '../text/limit';

type NavigationProps = NativeStackNavigationProp<any>;

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const navigation = useNavigation<NavigationProps>();
  const { logout, isLoggedIn, user } = useAuth();

  const handlePress = (action: string, event?: GestureResponderEvent) => {
    Alert.alert('Ação Pressionada', `Você clicou em: ${action}`, [
      { text: 'OK' },
    ]);
  };

  const handleLogout = () => {
    logout();
    navigation.replace(Routes.SIGN_IN.name);
  };

  return (
    <View className="bg-bgGray py-1 px-3 flex-row rounded-2xl">
      <View className="flex-row items-center gap-2">
        <UserCircleIcon size={40} />
      </View>
      <View className="flex-col ml-3">
        <View className="flex-row gap-2">
          <Text className="text-black text-xl font-bold">
            {truncateText(user?.name || '', 10)}
          </Text>
        </View>
        <View className="flex-row items-center gap-2 justify-between">
          <Pressable onPress={event => handlePress('Perfil', event)}>
            <Text className="text-textGray text-lg font-bold">Perfil</Text>
          </Pressable>
          <Text className="text-textGray">{'\u25CF'}</Text>

          <Pressable onPress={handleLogout}>
            <Text className="text-textGray text-lg font-bold">
              {isLoggedIn ? 'Sair' : 'Entrar'}{' '}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Menu;
