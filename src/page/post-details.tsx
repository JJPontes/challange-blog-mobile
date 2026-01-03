import React, { JSX } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../constants/routesMap';
import { useAuth } from '../hooks/useAuth';
import { Detail } from '../types/post';
import { formatStringForDate } from '../utils/dateFormat';
import { useTranslation } from 'react-i18next';
import TagCategory from '../components/text/tagCategory';
import { ArrowLeft } from 'phosphor-react-native';
import { ScreenWrapper } from '../components/screens/screenWrapper';

type NavigationProps = NativeStackNavigationProp<any>;

export default function PostDetailScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProps>();
  const { t, i18n } = useTranslation();
  const { isLoggedIn } = useAuth();
  const route = useRoute<any>();
  const detail: Detail | undefined = route?.params?.detail as
    | Detail
    | undefined;

  const handleBack = () => {
    navigation.replace(Routes.POSTS.name);
  };

  if (!detail) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Erro ao carregar o Post</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 bg-bgGray">
        <View className="p-2 my-10 mx-5 rounded-md bg-white">
          <View className="p-4">
            <View className="flex-row items-center justify-between w-full">
              <Pressable onPress={handleBack} className="flex-row items-center">
                <ArrowLeft size={20} color="#6B7280" />

                <Text className="text-textGray text-lg font-bold ml-2">
                  Posts
                </Text>
              </Pressable>

              <TagCategory category={detail.category_name} isLeft={false} />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mt-1">
              {detail.title}
            </Text>

            <Text className="text-gray-500 mt-2">
              Por Profª {detail.user_name} {'\u25CF'}{' '}
              {formatStringForDate(detail.created_at)}
            </Text>

            <Text className={'text-lg leading-relaxed text-gray-800'}>
              {detail.content}
            </Text>

            <View className="border-t border-gray-200 mt-6 pt-4">
              <Text className="text-xl font-bold">
                Comentários ({/*detail.totalComments*/ 12})
              </Text>
            </View>

            {isLoggedIn ? (
              <View className="my-8">
                <TouchableOpacity className="bg-primary h-12 rounded-lg items-center justify-center">
                  <Text className="text-white font-semibold">Comentar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="my-8">
                <TouchableOpacity
                  className="bg-alert h-12 rounded-lg items-center justify-center"
                  onPress={() => navigation.navigate(Routes.SIGN_IN.name)}
                >
                  <Text className="text-white font-semibold">
                    Faça login para comentar neste Post.
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
