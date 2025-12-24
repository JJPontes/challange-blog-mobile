import React from 'react';
import { View, Text, Image } from 'react-native';
import Logo from '../../assets/logo.png';
import Menu from './menu';

const Navbar = () => {
  return (
    <View className="bg-white p-4 flex-row justify-between">
      <View className="flex-row items-center">
        <Image
          source={Logo}
          className="h-10 w-10"
          style={{ width: 40, height: 40 }}
        />
        <Text className="ml-2 text-black text-2xl font-bold">Blog Escolar</Text>
      </View>
      <View>
        <Menu />
      </View>
    </View>
  );
};
export default Navbar;
