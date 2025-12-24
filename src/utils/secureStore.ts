// src/utils/secureStore.ts

// ❌ REMOVIDO: import * as Keychain from 'react-native-keychain';
// ✅ NOVO: Importa o SecureStore do Expo
import * as SecureStoreExpo from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
// O expo-secure-store não usa 'service', então mantemos apenas a chave do item
const TOKEN_KEY = 'token';

export const SecureStore = {
  // 🔑 Obtém o Token
  get: async (): Promise<string | null> => {
    // 1. Lógica para Web (Fallback INSEGURO)
    if (isWeb) {
      // O AsyncStorage usa o localStorage do navegador no ambiente web.
      return AsyncStorage.getItem(TOKEN_KEY);
    }

    // 2. Lógica para Android / iOS (SEGURO via Expo Secure Store)
    try {
      // O Expo Secure Store lida com o armazenamento seguro diretamente
      const token = await SecureStoreExpo.getItemAsync(TOKEN_KEY);
      return token;
    } catch (e) {
      // O Expo Secure Store é mais estável, mas mantemos o catch
      console.error('SecureStore GET failed on Mobile (Expo):', e);
      return null;
    }
  },

  // 🔑 Salva o Token
  set: async (token: string): Promise<void> => {
    // 1. Lógica para Web (Fallback INSEGURO)
    if (isWeb) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      return;
    }

    // 2. Lógica para Android / iOS (SEGURO via Expo Secure Store)
    try {
      // O setItemAsync salva de forma segura (Keychain/Keystore)
      await SecureStoreExpo.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
      console.error('SecureStore SET failed on Mobile (Expo):', e);
    }
  },

  // 🔑 Remove o Token
  remove: async (): Promise<void> => {
    // 1. Lógica para Web (Fallback INSEGURO)
    if (isWeb) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      return;
    }

    // 2. Lógica para Android / iOS (SEGURO via Expo Secure Store)
    try {
      // O deleteItemAsync remove o item seguro
      await SecureStoreExpo.deleteItemAsync(TOKEN_KEY);
    } catch (e) {
      console.error('SecureStore REMOVE failed on Mobile (Expo):', e);
    }
  },
};
