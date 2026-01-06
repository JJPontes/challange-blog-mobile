import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DotsThreeVertical, PencilSimple, Trash } from 'phosphor-react-native';

interface TeacherProps {
  teacher: { name: string; email: string; department: string; };
  onEdit: () => void;
}

export default function TeacherRow({ teacher, onEdit }: TeacherProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <View className="flex-row items-center py-4 border-b border-gray-100 relative z-10">
      <View className="flex-1 pr-2"><Text className="font-bold text-gray-800 text-sm">{teacher.name}</Text></View>
      <View className="flex-1 pr-2"><Text className="text-gray-600 text-xs text-center">{teacher.email}</Text></View>
      <View className="flex-1 pr-2"><Text className="text-gray-600 text-sm text-center">{teacher.department}</Text></View>
      <View className="w-10 items-center">
        <TouchableOpacity onPress={() => setShowActions(!showActions)}>
          <DotsThreeVertical size={24} color="#111827" weight="bold" />
        </TouchableOpacity>
        {showActions && (
          <View className="absolute right-8 top-0 bg-white border border-gray-200 rounded-lg shadow-lg w-32 z-50">
            <TouchableOpacity 
              className="flex-row items-center p-3 border-b border-gray-100" 
              onPress={() => { onEdit(); setShowActions(false); }}
            >
              <PencilSimple size={16} color="#4B5563" />
              <Text className="ml-2 text-gray-700">Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center p-3" onPress={() => setShowActions(false)}>
              <Trash size={16} color="#EF4444" />
              <Text className="ml-2 text-red-500">Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}