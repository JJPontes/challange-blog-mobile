import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Routes } from '../../constants/routesMap';
import { useAuth } from '../../contexts/AuthContext';

const TabBar: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const role = user?.roleName;

  const currentRouteName = useNavigationState(state => {
    if (!state) return null;
    const route = state.routes[state.index];
    return route.state ? route.state.routes[route.state.index ?? 0].name : route.name;
  });

  if (currentRouteName === Routes.SIGN_IN.name || !user) return null;

  return (
    <View className="flex-row bg-white justify-around items-center h-6">
      <Pressable
        onPress={() => navigation.navigate(Routes.POSTS.name)}
        className="flex-1 items-center"
      >
          <Text className={`text-sm ${currentRouteName === Routes.POSTS.name ? "text-blue-500 font-bold" : "text-gray-400"}`}>
            POSTS
          </Text>
      </Pressable>

      {role === 'coordinator' && (
        <Pressable
          onPress={() => navigation.navigate(Routes.USERS.name)}
          className="flex-1 items-center"
        >
          <Text className={`text-sm ${currentRouteName === Routes.USERS.name ? "text-blue-500 font-bold" : "text-gray-400"}`}>
            USUÁRIOS
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default TabBar;