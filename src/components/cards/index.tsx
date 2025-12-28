import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../constants/routesMap';
import { truncateText } from '../text/limit';
import { Detail } from '../../types/post';
import { formatStringForDate } from '../../utils/dateFormat';
import TagCategory from '../../components/text/tagCategory';
import { useAuth } from '../../hooks/useAuth';
import { DotsThreeVertical, PencilSimple, Trash } from 'phosphor-react-native';

type NavigationProps = NativeStackNavigationProp<any>;

const Cards: React.FC<Detail> = (props) => {
  const { id, title, content, is_active, user_name, category_name, created_at, user_id } = props;
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuth();

  const isOwner = user?.id === user_id;

  const handleDelete = () => {
    Alert.alert(
      "Excluir Post",
      "Tem certeza que deseja remover esta postagem?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => console.log("Chamar sua função de delete aqui", id) 
        }
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate(Routes.POST_DETAILS?.name || 'EditPost', { detail: props });
  };

  const showOptions = () => {
  Alert.alert(
    "Opções do Post",
    "O que deseja fazer?",
    [
      { text: "Editar", onPress: handleEdit },
      { text: "Excluir", onPress: handleDelete, style: "destructive" }
    ],
    { 
      cancelable: true,
      onDismiss: () => console.log("Usuário fechou o alerta clicando fora") 
    }
  );
};

  return (
    <View className="rounded-2xl bg-white p-6 mb-4 shadow-sm">
      <View className="flex-row justify-between items-start w-full">
        <Text className="text-xl font-semibold flex-1 pr-2">
          {truncateText(title)}
        </Text>

        {isOwner ? (
          <TouchableOpacity 
            onPress={showOptions}
            className="p-2 -mr-2"
          >
            <DotsThreeVertical size={24} color="#6B7280" weight="bold" />
          </TouchableOpacity>
        ) : (
          <View className="rounded-full bg-bgGray py-1 px-3 flex-row items-center justify-center">
            <Text className="text-textGray text-xs font-medium">Público</Text>
          </View>
        )}
      </View>

      <View className="mt-2">
        <Text className="text-textGray text-sm">
          Por Profª {user_name} {'\u25CF'} {formatStringForDate(created_at)}
        </Text>
      </View>

      <View className="mt-4">
        <Text className="text-base text-gray-700 leading-6">
          {truncateText(content, 100)}
        </Text>
      </View>

      <View className="flex-row items-center mt-6 justify-between">
        <TagCategory category={category_name} isLeft={true} />
        
        <View className="flex-row items-center">
          <Text className="text-gray-400 text-sm">3 comentários</Text>
          <TouchableOpacity
            className="ml-4 active:opacity-60"
            onPress={() => navigation.navigate(Routes.POST_DETAILS.name, { detail: props })}
          >
            <Text className="text-linkPrimary font-bold">Ler Mais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cards;