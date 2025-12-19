import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// ✅ Importa o novo módulo com a lógica condicional
import { SecureStore } from '../utils/secureStore'; 
// import * as Keychain from 'react-native-keychain'; // ❌ REMOVIDO: Causa erro no web

import type { User } from '../types/user';
import type { LoginResponse } from '../types/auth';

type UseAuthReturn = {
    // ... (Tipagem permanece a mesma)
    isLoggedIn: boolean;
    user: User | null;
    login: (response: LoginResponse) => Promise<void>; 
    logout: () => Promise<void>; 
    isLoading: boolean;
};

const USER_KEY = 'user'; // Continua no AsyncStorage

function safeParseUser(value: string | null): User | null {
    // ... (Sua função de parsing permanece a mesma)
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

    // --- 1. Carregamento Inicial (useEffect) ---
    useEffect(() => {
        let mounted = true;

        async function loadInitialState() {
            try {
                // 🔑 Busca o token usando o utilitário SecureStore.get()
                const token = await SecureStore.get(); 

                // 📁 Busca o usuário no AsyncStorage
                const userJson = await AsyncStorage.getItem(USER_KEY);

                if (!mounted) return;

                const parsedUser = safeParseUser(userJson);
                // O usuário é considerado logado se tiver TOKEN E dados do usuário válidos
                const isUserLoggedIn = !!token && !!parsedUser; 
                
                setIsLoggedIn(isUserLoggedIn);
                setUser(isUserLoggedIn ? parsedUser : null);

            } catch (e) {
                // O erro de carregamento será mais limpo agora, pois o SecureStore
                // já trata as falhas do Keychain internamente.
                console.error("Erro ao carregar estado de autenticação:", e);
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
        // ...
    }, []);

    // --- 2. Login Assíncrono ---
    const login = useCallback(async (response: LoginResponse) => {
        const { token, id, name, email } = response.details;
        const userData: User = { id, name, email };

        // 1. Atualizar o estado (rápido para UX)
        setUser(userData);
        setIsLoggedIn(true);

        // 2. Salvar no Secure Store e AsyncStorage
        try {
            // 🔑 Salva o token de forma segura/condicional
            await SecureStore.set(token); 
            // 📁 Salva os dados do usuário (não-sensíveis)
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)); 
        } catch (e) {
             console.error("Erro ao salvar dados seguros:", e);
        }
    }, []);

    // --- 3. Logout Assíncrono ---
    const logout = useCallback(async () => {
        
        // 1. Limpar o estado
        setUser(null);
        setIsLoggedIn(false);
        
        // 2. Remover do Secure Store e Insecure Storage
        try {
            // 🔑 Remove o token (condicionalmente)
            await SecureStore.remove();
            // 📁 Remove os dados do usuário
            await AsyncStorage.removeItem(USER_KEY);
        } catch (e) {
            console.error("Erro ao remover dados seguros:", e);
        }
    }, []);


    return { isLoggedIn, user, login, logout, isLoading };
}