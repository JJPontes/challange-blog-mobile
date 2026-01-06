import React from 'react';
import { View, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scroll = false,
  className = '',
}) => {
  const { user } = useAuth();
  const SPACING = 20;

  const navbarHeight = user?.roleName === 'coordinator' ? 100 : 50;
  const totalPaddingTop = navbarHeight + SPACING;

  const baseClasses = `flex-1 ${className}`;

  if (scroll) {
    return (
      <ScrollView
        className={baseClasses}
        contentContainerStyle={{ paddingTop: totalPaddingTop }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View className={baseClasses} style={{ paddingTop: totalPaddingTop }}>
      {children}
    </View>
  );
};
