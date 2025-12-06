import React from 'react';
import { View, Text } from 'react-native';
import NavigateButton from '../components/button/NavigateButton';
import { Routes } from '../constants/routesMap';

export default function Posts() {
  return (
    <View>
      <Text>Posts page</Text>
      {/*Botão de teste*/}
      <NavigateButton title="Go to Post Details" screenName={Routes.POST_DETAILS.name} />
    </View>
  );
}
