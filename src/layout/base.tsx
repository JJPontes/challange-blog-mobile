import React from 'react';
import { View, StyleSheet, StatusBar, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  disableVerticalPadding?: boolean;
  backgroundColor?: string;
};

export default function BaseLayout({
  children,
  disableVerticalPadding = false,
  backgroundColor = '#F1F5F9',
}: Props) {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingTop: disableVerticalPadding ? 0 : insets.top,
    paddingBottom: disableVerticalPadding ? 0 : insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
