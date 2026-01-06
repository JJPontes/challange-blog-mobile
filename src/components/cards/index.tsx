import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';
import { truncateText } from '../text/limit';
import { Detail } from '../../types/post';
import { formatStringForDate } from '../../utils/dateFormat';
import TagCategory from '../../components/text/tagCategory';
import { useAuth } from '../../hooks/useAuth';
import { DotsThreeVertical } from 'phosphor-react-native';
import CustomAlert from '../alerts/CustomAlert';
import { remove } from '../../services/postServices';

type NavigationProps = NativeStackNavigationProp<any>;

interface CardsProps extends Detail {
  onDeleteSuccess: (id: string) => void;
}

const Cards: React.FC<CardsProps> = props => {
  const {
    id,
    title,
    content,
    user_name,
    category_name,
    created_at,
    user_id,
    onDeleteSuccess,
  } = props;

  const navigation = useNavigation<NavigationProps>();
  const { user, isLoggedIn } = useAuth();
  const [optionsVisible, setOptionsVisible] = useState(false);

  const isOwner = isLoggedIn && user?.id === user_id;

  const handleEdit = () => {
    setOptionsVisible(false);
    navigation.navigate(Routes.POST_CREATE_EDIT.name, { id: props.id });
  };

  const handleDelete = async (postId: string) => {
    setOptionsVisible(false);
    try {
      await remove(postId);
      onDeleteSuccess(postId);
    } catch (error) {
      console.log('Erro ao deletar o post:', error);
      Alert.alert('Erro', 'Não foi possível deletar o post.');
    }
  };

  return (
    <View className="rounded-md bg-white p-6 mb-4 border border-gray-100">
      <View className="flex-row justify-between items-start w-full">
        <Text className="text-xl font-semibold flex-1 pr-2 text-gray-900">
          {truncateText(title)}
        </Text>

        {isOwner ? (
          <TouchableOpacity
            onPress={() => setOptionsVisible(true)}
            className="p-2 -mr-2 active:bg-gray-100 rounded-full"
          >
            <DotsThreeVertical size={24} color="#6b7280" weight="bold" />
          </TouchableOpacity>
        ) : (
          <View className="rounded-full bg-gray-100 py-1 px-3">
            <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              Público
            </Text>
          </View>
        )}
      </View>

      <View className="mt-2">
        <Text className="text-gray-500 text-sm">
          Por Profª {user_name} {'\u25CF'} {formatStringForDate(created_at)}
        </Text>
      </View>

      <View className="mt-4">
        <Text className="text-base text-gray-700 leading-6">
          {truncateText(content, 100)}
        </Text>
      </View>

      <View className="flex-row items-center mt-6 justify-between border-t border-gray-50 pt-4">
        <TagCategory category={category_name} isLeft={true} />

        <View className="flex-row items-center">
          <Text className="text-gray-400 text-md mr-3">3 comentários</Text>
          <TouchableOpacity
            className="active:opacity-60"
            onPress={() =>
              navigation.navigate(Routes.POST_DETAILS.name, { detail: props })
            }
          >
            <Text className="text-blue-600 font-bold text-base">Ler Mais</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomAlert
        visible={optionsVisible}
        type="info"
        title="Opções do Post"
        message="O que deseja fazer?"
        onClose={() => setOptionsVisible(false)}
        confirmText="Editar"
        onConfirm={handleEdit}
        secondaryText="Excluir"
        secondaryAction={() => handleDelete(id)}
        showCancelButton={false}
      />
    </View>
  );
};

export default Cards;
