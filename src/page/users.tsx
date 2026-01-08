import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ScreenWrapper } from '../components/screens/screenWrapper';
import {
  Plus,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
} from 'phosphor-react-native';

import { User, UserResponse } from '../types/user';
import { getall, remove } from '../services/userService';
import CustomAlert from '../components/alerts/CustomAlert';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../constants/routesMap';

type NavigationProps = NativeStackNavigationProp<any>;

export default function Users() {
  const navigation = useNavigation<NavigationProps>();
  const [users, setUsers] = useState<User[]>([]);
  const [apiResponse, setApiResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const LIMIT = 6;
  const ORDER = 'ASC';

  const fetchUsers = useCallback(async (targetPage: number) => {
    try {
      setLoading(true);
      const response = await getall(targetPage, LIMIT, ORDER);
      const data: UserResponse = response.data;

      setApiResponse(data);

      if (data.details) {
        if (Array.isArray(data.details)) {
          setUsers(data.details);
        } else if (typeof data.details === 'object') {
          setUsers([data.details as User]);
        } else {
          setUsers([]);
        }
      }
    } catch (err: any) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  const handleOpenOptions = (user: User) => {
    setSelectedUser(user);
    setAlertVisible(true);
  };

  const handleEdit = () => {
    setAlertVisible(false);
    if (selectedUser) {
      navigation.navigate(Routes.USER_CREATE_EDIT.name, {
        userData: selectedUser,
      });
    }
  };

  const handleDelete = async (postId: string) => {
    setAlertVisible(false);
    try {
      setLoading(true);
      await remove(postId);
      fetchUsers(page);
    } catch (error) {
      console.log('Erro ao deletar o post:', error);
      Alert.alert('Erro', 'Não foi possível deletar o post.');
    }
  };

  const getRoleConfig = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'teacher':
        return { label: 'Professor', bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'coordinator':
        return {
          label: 'Coordenador',
          bg: 'bg-purple-100',
          text: 'text-purple-700',
        };
      default:
        return { label: 'Aluno', bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  return (
    <ScreenWrapper className="bg-bgGray">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6 my-10 mx-5 rounded-md bg-white shadow-sm">
          <View>
            <Text className="text-2xl font-bold text-slate-900">
              Cadastros de Usuários
            </Text>
            <Text className="text-textGray text-md font-bold mt-2">
              Gerencie os acessos dos usuários.
            </Text>
          </View>

          <View className="my-6">
            <TouchableOpacity
              className="bg-primary h-8 rounded-md items-center
             justify-center flex-row px-4 w-[140px]"
              onPress={() =>
                navigation.navigate(Routes.USER_CREATE_EDIT.name, {
                  userData: null,
                })
              }
            >
              <Plus size={20} weight="bold" color="#fff" />
              <Text className="text-white font-semibold ml-2 text-lg">
                Novo usuário
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row pb-3 border-b border-gray-200">
            <Text className="flex-[1.5] text-slate-400 font-bold uppercase text-[10px]">
              Nome
            </Text>
            <Text className="flex-[2] text-slate-400 font-bold uppercase text-[10px]">
              Email
            </Text>
            <Text className="flex-1 text-center text-slate-400 font-bold uppercase text-[10px]">
              Cargo
            </Text>
            <View className="w-8" />
          </View>

          <View className="min-h-[300px]">
            {loading && users.length === 0 ? (
              <View className="py-20">
                <ActivityIndicator color="#4F46E5" size="large" />
              </View>
            ) : (
              users.map(item => (
                <View
                  key={item.id}
                  className="flex-row items-center py-4 border-b border-gray-100"
                >
                  <View className="flex-[1.5] pr-2">
                    <Text
                      className="font-bold text-slate-800 text-sm"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View className="flex-[2] pr-2">
                    <Text className="text-textGray text-xs" numberOfLines={1}>
                      {item.email}
                    </Text>
                  </View>
                  <View className="flex-1 items-center">
                    <View
                      className={`${getRoleConfig(item.role_name).bg} px-2 py-1 rounded-md min-w-[75px] items-center`}
                    >
                      <Text
                        className={`${getRoleConfig(item.role_name).text} text-[10px] font-bold uppercase`}
                      >
                        {getRoleConfig(item.role_name).label}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleOpenOptions(item)}>
                    <DotsThreeVertical
                      size={22}
                      color="#64748b"
                      weight="bold"
                    />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          <View className="flex-row items-center justify-between pt-6 border-t border-gray-100">
            <Text className="text-slate-500 text-md">
              Total: {apiResponse?.pagination?.total || 0}
            </Text>
            <View className="flex-row items-center">
              <Text className="mr-4 text-md">
                Pág. {apiResponse?.pagination?.currentPage || 1} de{' '}
                {apiResponse?.pagination?.totalPages || 1}
              </Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => setPage(p => Math.max(1, p - 1))}
                  disabled={
                    !apiResponse?.pagination?.hasPreviousPage || loading
                  }
                  className={`p-2 text-md rounded-md bg-gray-100 ${!apiResponse?.pagination?.hasPreviousPage ? 'opacity-20' : ''}`}
                >
                  <CaretLeft size={20} weight="bold" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPage(p => p + 1)}
                  disabled={!apiResponse?.pagination?.hasNextPage || loading}
                  className={`p-2 text-md rounded-md bg-gray-100 ${!apiResponse?.pagination?.hasNextPage ? 'opacity-20' : ''}`}
                >
                  <CaretRight size={20} weight="bold" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        type="info"
        title="Opções de Usuários"
        message={`O que deseja fazer com ${selectedUser?.name} ?`}
        onClose={() => setAlertVisible(false)}
        confirmText="Editar"
        onConfirm={handleEdit}
        secondaryText="Excluir"
        secondaryAction={() => handleDelete(selectedUser?.id || '')}
        showCancelButton={false}
      />
    </ScreenWrapper>
  );
}
