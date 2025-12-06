import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Navbar from '../components/header/navbar';

type Props = {
  children: React.ReactNode;
  disableVerticalPadding?: boolean;
};

export default function BaseLayout({
  children,
  disableVerticalPadding = false,
}: Props) {
  const insets = useSafeAreaInsets();

  const containerStyle = {
    flex: 1,
    backgroundColor: '#EEF2FF',
    paddingTop: disableVerticalPadding ? 0 : insets.top,
    paddingBottom: disableVerticalPadding ? 0 : insets.bottom,
  };

  return (
    <View style={containerStyle}>
      <StatusBar barStyle="dark-content" />
      <Navbar />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
