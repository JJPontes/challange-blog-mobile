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

interface MenuProps {
  // Se o Menu precisasse de props como username, seria assim:
  // username: string;
  // userId: number;
}

const Menu: React.FC<MenuProps> = () => {
  const handlePress = (action: string, event?: GestureResponderEvent) => {
    Alert.alert('Ação Pressionada', `Você clicou em: ${action}`, [
      { text: 'OK' },
    ]);
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
          <Pressable onPress={event => handlePress('Sair', event)}>
            <Text className="text-textGray text-lg font-bold">Sair</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default Menu;
