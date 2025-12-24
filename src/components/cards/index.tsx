import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';
import { truncateText } from '../text/limit';
import { Detail } from '../../types/post';
import { formatStringForDate } from '../../utils/dateFormat';
import TagCategory from '../../components/text/tagCategory';

type NavigationProps = NativeStackNavigationProp<any>;

const Cards: React.FC<Detail> = ({
  id,
  title,
  content,
  is_active,
  user_name,
  category_name,
  created_at,
}) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View className="rounded-2xl bg-white p-6 max-h-100">
      <View className="flex-row justify-between w-full">
        <Text className="text-xl font-semibold flex-shrink pr-2">
          {truncateText(title)}
        </Text>
        <View className="rounded-full bg-bgGray h-10 py-1 px-3 flex-row items-center justify-center">
          <Text className="text-textGray text-md">Público</Text>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-textGray text-md">
          Por Profª {user_name} {'\u25CF'} {formatStringForDate(created_at)}
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-xl w-200">{truncateText(content, 100)}</Text>
      </View>
      <View className="flex-row items-center mt-4 gap-2 justify-between">
        <TagCategory category={category_name} isLeft={true} />
        <View className="flex-row justify-between">
          <Text className="text-textGray">3 comentários</Text>
          <TouchableOpacity
            className=" underline-none text-base ml-3
                  active:opacity-75 transition-opacity"
            onPress={() =>
              navigation.navigate(Routes.POST_DETAILS.name, {
                detail: {
                  id,
                  title,
                  content,
                  is_active,
                  user_name,
                  category_name,
                  created_at,
                },
              })
            }
          >
            <Text className="text-linkPrimary">Ler Mais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Cards;
