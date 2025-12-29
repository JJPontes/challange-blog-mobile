import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

type NavigationProps = NativeStackNavigationProp<any>;

const Cards: React.FC<Detail> = props => {
  const { id, title, content, user_name, category_name, created_at, user_id } =
    props;

  const navigation = useNavigation<NavigationProps>();
  const { user, isLoggedIn } = useAuth();

  // Estado para controlar o modal de opções únicas
  const [optionsVisible, setOptionsVisible] = useState(false);

  // Regra de dono: Logado + IDs correspondentes
  const isOwner = isLoggedIn && user?.id === user_id;

  const handleEdit = () => {
    setOptionsVisible(false);
    navigation.navigate(Routes.POST_DETAILS.name, {
      detail: props,
    });
  };

  const handleDelete = () => {
    setOptionsVisible(false);
    // Lógica para deletar o post
    console.log('Deletando post ID:', id);
  };

  return (
    <View className="rounded-2xl bg-white p-6 mb-4 border border-gray-100 shadow-sm">
      {/* HEADER: Título e Botão de Opções */}
      <View className="flex-row justify-between items-start w-full">
        <Text className="text-xl font-semibold flex-1 pr-2 text-gray-900">
          {truncateText(title)}
        </Text>

        {isOwner ? (
          <TouchableOpacity
            onPress={() => setOptionsVisible(true)}
            className="p-2 -mr-2 active:bg-gray-100 rounded-full"
          >
            <DotsThreeVertical size={24} color="#6B7280" weight="bold" />
          </TouchableOpacity>
        ) : (
          <View className="rounded-full bg-gray-100 py-1 px-3">
            <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">
              Público
            </Text>
          </View>
        )}
      </View>

      {/* SUBHEADER: Autor e Data */}
      <View className="mt-2">
        <Text className="text-gray-500 text-sm">
          Por Profª {user_name} {'\u25CF'} {formatStringForDate(created_at)}
        </Text>
      </View>

      {/* BODY: Conteúdo resumido */}
      <View className="mt-4">
        <Text className="text-base text-gray-700 leading-6">
          {truncateText(content, 100)}
        </Text>
      </View>

      {/* FOOTER: Categoria e Link */}
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

      {/* ALERTA ÚNICO: CONFIGURADO COM EDITAR E DELETAR, SEM CANCELAR */}
      <CustomAlert
        visible={optionsVisible}
        type="info"
        title="Opções do Post"
        message="O que deseja fazer?"
        onClose={() => setOptionsVisible(false)} // Fecha ao clicar fora
        // Botão 1
        confirmText="Editar"
        onConfirm={handleEdit}
        // Botão 2
        secondaryText="Excluir"
        secondaryAction={handleDelete}
        // AQUI ESTÁ O SEGREDO:
        showCancelButton={false}
      />
    </View>
  );
};

export default Cards;
