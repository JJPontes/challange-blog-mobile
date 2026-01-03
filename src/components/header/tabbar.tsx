import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';

type NavigationProps = NativeStackNavigationProp<any>;

const TabBar: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const currentRouteName = useNavigationState(state => {
    if (!state) return null;
    const route = state.routes[state.index];
    if (route.state) {
      return route.state.routes[route.state.index ?? 0].name;
    }
    return route.name;
  });

  if (currentRouteName === Routes.SIGN_IN.name) {
    return null;
  }

  const handleRedirect = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View className="flex-row bg-white justify-around items-center h-6">
      <Pressable
        onPress={() => handleRedirect(Routes.POSTS.name)}
        className="flex-1 items-center justify-center h-full"
      >
        <View
          className={`pb-1 ${
            currentRouteName === Routes.POSTS.name
              ? 'border-b-2 border-blue-500'
              : 'border-b-2 border-transparent'
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              currentRouteName === Routes.POSTS.name
                ? 'text-blue-500'
                : 'text-gray-400'
            }`}
          >
            POSTS
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => handleRedirect(Routes.USERS.name)}
        className="flex-1 items-center justify-center h-full"
      >
        <View
          className={`pb-1 ${
            currentRouteName === Routes.USERS.name
              ? 'border-b-2 border-blue-500'
              : 'border-b-2 border-transparent'
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              currentRouteName === Routes.USERS.name
                ? 'text-blue-500'
                : 'text-gray-400'
            }`}
          >
            USUÁRIOS
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default TabBar;
