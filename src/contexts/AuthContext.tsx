import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecureStore } from '../utils/secureStore';

const USER_KEY = 'user_data';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStorageData = useCallback(async () => {
    try {
      const token = await SecureStore.get();
      const userJson = await AsyncStorage.getItem(USER_KEY);
      if (token && userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadStorageData(); }, []);

  const login = async (response: any) => {
    const data = response?.data?.details || response?.details || response;
    const userData = {
      id: String(data.id),
      name: data.name,
      roleName: data.roleName.toLowerCase().trim(),
    };
    
    await SecureStore.set(data.token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.remove();
    await AsyncStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);