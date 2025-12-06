import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/user';
import type { LoginResponse } from '../types/auth';

export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (response: LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'token';
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [token, userJson] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        if (!mounted) return;
        setIsLoggedIn(!!token);
        setUser(safeParseUser(userJson));
      } catch {
        if (!mounted) return;
        setIsLoggedIn(false);
        setUser(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (response: LoginResponse) => {
    const { token, id, name, email } = response.details;
    const userData: User = { id, name, email };
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch {
      /* ignorar erro de armazenamento */
    }
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch {
      /* ignorar erro de remoção */
    }
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const value: AuthContextType = { isLoggedIn, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}