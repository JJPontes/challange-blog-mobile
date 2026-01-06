import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenWrapper } from '../components/screens/screenWrapper';
import { Routes } from '../constants/routesMap';
import TeacherRow from '../components/cards/TeacherRow';

export default function Users() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const showSuccessMessage = route.params?.success === true;

  const allTeachers = [
    { name: 'Profª Ana Souza', email: 'ana.souza@escola.edu', department: 'História' },
    { name: 'Prof. Carlos Lima', email: 'carlos.lima@escola.edu', department: 'Matemática' },
    { name: 'Profª Maria Oliveira', email: 'maria.oliveira@escola.edu', department: 'Português' },
    { name: 'Prof. João Silva', email: 'joao.silva@escola.edu', department: 'Física' },
    { name: 'Profª Cláudia Cruz', email: 'claudia.cruz@escola.edu', department: 'Química' },
    { name: 'Prof. Ricardo Alves', email: 'ricardo.alves@escola.edu', department: 'Biologia' },
  ];

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;
  
  const currentTeachers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTeachers.slice(start, start + itemsPerPage);
  }, [filteredTeachers, currentPage]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setCurrentPage(1);
  };

  return (
    <ScreenWrapper>
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-6 mt-[60px] mx-4 bg-white rounded-xl shadow-sm mb-10">
          <Text className="text-2xl font-bold text-gray-900">Professores</Text>
          <Text className="text-gray-500 mt-1 mb-6">Gerencie os usuários professores da plataforma.</Text>

          <TouchableOpacity 
            className="bg-[#2563EB] py-3 px-6 rounded-lg self-start mb-4"
            onPress={() => navigation.navigate(Routes.USER_CREATE_EDIT.name)}
          >
            <Text className="text-white font-bold">+ Novo professor</Text>
          </TouchableOpacity>

          {showSuccessMessage && (
            <View className="bg-[#10A34F] p-3 rounded-lg mb-6">
              <Text className="text-white font-semibold text-center">Professor cadastrado com sucesso.</Text>
            </View>
          )}

          <View className="flex-row mb-6 border border-gray-200 rounded-lg px-3 items-center">
            <TextInput
              placeholder="Buscar por nome ou e-mail..."
              className="flex-1 h-12 text-gray-800"
              value={search}
              onChangeText={handleSearch}
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row pb-2 border-b border-gray-200">
            <Text className="flex-1 text-gray-400 font-semibold text-xs">Nome</Text>
            <Text className="flex-1 text-gray-400 font-semibold text-xs text-center">Email</Text>
            <Text className="flex-1 text-gray-400 font-semibold text-xs text-center">Departamento</Text>
            <Text className="w-10 text-gray-400 font-semibold text-xs text-center">Ações</Text>
          </View>

          {currentTeachers.map((teacher, index) => (
            <TeacherRow 
              key={`${teacher.email}-${index}`} 
              teacher={teacher} 
              onEdit={() => navigation.navigate(Routes.USER_CREATE_EDIT.name, { teacher })}
            />
          ))}

          <View className="flex-row justify-between items-center mt-8">
            <Text className="text-gray-700 font-semibold">Página {currentPage} de {totalPages}</Text>
            <View className="flex-row">
              <TouchableOpacity 
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-lg mr-2 ${currentPage === 1 ? 'bg-gray-200' : 'bg-[#EFF6FF]'}`}
                onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <Text className={currentPage === 1 ? 'text-gray-400' : 'text-[#1E40AF] font-bold'}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                disabled={currentPage === totalPages}
                className={`py-2 px-4 rounded-lg ${currentPage === totalPages ? 'bg-gray-200' : 'bg-[#EFF6FF]'}`}
                onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <Text className={currentPage === totalPages ? 'text-gray-400' : 'text-[#1E40AF] font-bold'}>Próxima</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}