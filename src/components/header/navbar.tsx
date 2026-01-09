import React from 'react';
import { View, Text, Image } from 'react-native';
import Logo from '../../assets/logo.png';
import Menu from './menu';
import TabBar from './tabbar';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <View>
      <View className="bg-white p-4 flex-row justify-between">
        <View className="flex-row items-center">
          <Image
            source={Logo}
            className="h-10 w-10"
            style={{ width: 40, height: 40 }}
          />
          <Text className="ml-2 text-black text-2xl font-bold">
            Blog Escolar
          </Text>
        </View>
        <View>
          <Menu />
        </View>
      </View>
      {user?.roleName?.toLowerCase() === 'coordinator' && (
        <View className="bg-white p-4">
          <TabBar />
        </View>
      )}
    </View>
  );
};
export default Navbar;
