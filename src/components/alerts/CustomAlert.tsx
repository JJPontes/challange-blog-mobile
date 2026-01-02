import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Warning, Info, CheckCircle, X } from 'phosphor-react-native';

interface CustomAlertProps {
  visible: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // Botão Editar
  confirmText?: string;
  secondaryAction?: () => void; // Botão Eliminar
  secondaryText?: string;
  showCancelButton?: boolean; // Controla o botão cinza
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type = 'info',
  title,
  message,
  onClose,
  onConfirm,
  confirmText,
  secondaryAction,
  secondaryText,
  showCancelButton = true,
}) => {
  const config = {
    success: {
      color: '#22C55E',
      icon: <CheckCircle color="#22C55E" size={54} weight="fill" />,
    },
    error: {
      color: '#EF4444',
      icon: <X color="#EF4444" size={54} weight="fill" />,
    },
    warning: {
      color: '#F59E0B',
      icon: <Warning color="#F59E0B" size={54} weight="fill" />,
    },
    info: {
      color: '#3498db',
      icon: <Info color="#3498db" size={54} weight="fill" />,
    },
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center px-6"
        onPress={onClose}
      >
        <Pressable
          className="bg-white w-full rounded-md p-8 items-center shadow-2xl"
          onPress={e => e.stopPropagation()}
        >
          <View className="mb-4">{config[type].icon}</View>

          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {title}
          </Text>
          <Text className="text-gray-500 text-center leading-6 mb-8 text-base">
            {message}
          </Text>

          <View className="w-full">
            <View className="flex-row w-full gap-3">
              {onConfirm && (
                <TouchableOpacity
                  onPress={onConfirm}
                  className="flex-1 h-14 bg-primary rounded-md items-center justify-center shadow-md"
                >
                  <Text className="text-white font-bold text-lg">
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              )}

              {secondaryAction && (
                <TouchableOpacity
                  onPress={secondaryAction}
                  className="flex-1 h-14 bg-red-500 rounded-md items-center justify-center shadow-md"
                >
                  <Text className="text-white font-bold text-lg">
                    {secondaryText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {showCancelButton && (
              <TouchableOpacity
                onPress={onClose}
                className="w-full h-14 bg-gray-100 rounded-md items-center justify-center mt-3"
              >
                <Text className="text-gray-600 font-semibold text-lg">
                  Cancelar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomAlert;
