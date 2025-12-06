import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<any>;

type Props = {
  title: string;
  screenName: string;
  style?: StyleProp<ViewStyle>;
};

export default function NavigateButton({ title, screenName, style }: Props) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});