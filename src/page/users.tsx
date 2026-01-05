import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { ScreenWrapper } from '../components/screens/screenWrapper';
import { Plus, DotsThreeVertical, CaretLeft, CaretRight } from 'phosphor-react-native';
import { User, UserResponse } from '../types/user'; 
import { getall } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../constants/routesMap';

type NavigationProps = NativeStackNavigationProp<any>;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiResponse, setApiResponse] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NavigationProps>();

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
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  const getRoleConfig = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'teacher': return { label: 'Professor', bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'coordinator': return { label: 'Coordenador', bg: 'bg-purple-100', text: 'text-purple-700' };
      default: return { label: 'Aluno', bg: 'bg-gray-100', text: 'text-gray-700' };
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
            <Text className="text-2xl font-bold text-slate-900">Cadastros de Usuários</Text>
            <Text className="text-textGray text-md font-bold mt-2">Gerencie as contas de usuários.</Text>
          </View>

          <View className="my-6">
            <TouchableOpacity className="bg-primary p-2 rounded-lg items-center justify-center flex-row px-4 active:opacity-70 w-[130px]"
             onPress={() =>
                navigation.navigate(Routes.USER_CREATE_EDIT.name, { id: null })
              }>
              <Plus size={14} weight="bold" color="#fff" />
              <Text className="text-white font-semibold ml-2 text-md">Criar usuário</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row pb-3 border-b border-gray-200">
            <Text className="flex-[1.5] text-slate-400 font-bold uppercase text-xs">Nome</Text>
            <Text className="flex-[2] text-slate-400 font-bold uppercase text-xs">Email</Text>
            <Text className="flex-1 text-center text-slate-400 font-bold uppercase text-xs">Cargo</Text>
            <View className="w-8" />
          </View>

          <View className="min-h-[300px]">
            {loading ? (
              <View className="flex-1 justify-center items-center py-20">
                <ActivityIndicator color="#4F46E5" size="large" />
              </View>
            ) : (
              users.map((item) => {
                const config = getRoleConfig(item.role_name);
                return (
                  <View key={item.id} className="flex-row items-center py-4 border-b border-gray-100">
                    <View className="flex-[1.5] pr-2">
                      <Text className="font-bold text-slate-800 text-sm" numberOfLines={1}>{item.name}</Text>
                    </View>
                    <View className="flex-[2] pr-2">
                      <Text className="text-textGray text-xs" numberOfLines={1}>{item.email}</Text>
                    </View>
                    <View className="flex-1 items-center">
                      <View className={`${config.bg} px-2 py-1 rounded-md min-w-[75px] items-center`}>
                        <Text className={`${config.text} text-[10px] font-bold uppercase`}>{config.label}</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-8 items-end">
                      <DotsThreeVertical size={22} color="#64748b" weight="bold" />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>

          <View className="flex-row items-center justify-between pt-2 border-t border-gray-100 ">
            <Text className="text-slate-500 text-md">
              Total: <Text className="font-bold text-slate-800">{apiResponse?.pagination?.total || 0}</Text>
            </Text>
            
            <View className="flex-row items-center">
               <Text className="text-slate-800 font-medium text-md mr-4">
                Pág. {apiResponse?.pagination?.currentPage || 1} de {apiResponse?.pagination?.totalPages || 1}
              </Text>

              <View className="flex-row space-x-2">
                <TouchableOpacity 
                  onPress={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!apiResponse?.pagination?.hasPreviousPage || loading}
                  className={`p-2 text-md rounded-md bg-gray-100 ${!apiResponse?.pagination?.hasPreviousPage ? 'opacity-20' : 'active:bg-gray-200'}`}
                >
                  <CaretLeft size={20} weight="bold" color="#1e293b" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setPage(p => p + 1)}
                  disabled={!apiResponse?.pagination?.hasNextPage || loading}
                  className={`p-2 text-md rounded-md bg-gray-100 ${!apiResponse?.pagination?.hasNextPage ? 'opacity-20' : 'active:bg-gray-200'}`}
                >
                  <CaretRight size={20} weight="bold" color="#1e293b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}