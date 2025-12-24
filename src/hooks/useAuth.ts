import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStore } from '../utils/secureStore';
import type { User } from '../types/user';
import type { LoginResponse } from '../types/auth';
import { Alert } from 'react-native';

type UseAuthReturn = {
  isLoggedIn: boolean;
  user: User | null;
  login: (response: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const USER_KEY = 'user';

function safeParseUser(value: string | null): User | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (
      typeof parsed.id === 'string' &&
      typeof parsed.name === 'string' &&
      typeof parsed.email === 'string'
    ) {
      return parsed as User;
    }
    return null;
  } catch {
    return null;
  }
}

export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadInitialState() {
      try {
        const token = await SecureStore.get();
        const userJson = await AsyncStorage.getItem(USER_KEY);
        if (!mounted) return;
        const parsedUser = safeParseUser(userJson);
        const isUserLoggedIn = !!token && !!parsedUser;
        setIsLoggedIn(isUserLoggedIn);
        setUser(isUserLoggedIn ? parsedUser : null);
      } catch (e) {
        console.error('Erro ao carregar estado de autenticação:', e);
        if (!mounted) return;
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadInitialState();
  }, []);

  const login = useCallback(async (response: any) => {
    try {
      const data = response?.data ? response.data : response;

      const { token, id, name, email, roleId } = data.details;
      const userData: User = { id, name, email, roleId };
      setUser(userData);
      setIsLoggedIn(true);
      await SecureStore.set(token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (e: any) {
      Alert.alert('ERRO NO CATCH', e.message || 'Erro desconhecido');
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      await SecureStore.remove();
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Erro ao remover dados seguros:', e);
    }
  }, []);

  return { isLoggedIn, user, login, logout, isLoading };
}
