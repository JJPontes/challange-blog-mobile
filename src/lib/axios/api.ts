import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert } from 'react-native';
import { API_URL, API_TIMEOUT } from '@env';
import { SecureStore } from '../../utils/secureStore';

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === 'android'
      ? 'http://192.168.3.49:3001'
      : 'http://localhost:3001';
  }
  return API_URL;
};
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const config = {
  baseURL: getBaseUrl(),
  timeout: Number(API_TIMEOUT) || 10000,
  headers: { 'Content-Type': 'application/json' },
};

export const ApiPublic = axios.create(config);
export const ApiPrivate = axios.create(config);

ApiPrivate.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      // 1. Alterado de AsyncStorage para SecureStore
      const token = await SecureStore.get();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        // Dica: Remova o Alert.alert em produção para não atrapalhar a UX
      }
    } catch (error) {
      console.error('Erro ao recuperar token do SecureStore', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; details?: string; error?: boolean }
      | undefined;

    if (data?.details) return data.details;
    if (data?.message) return data.message;

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function handleRequest<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const res = await promise;
    return {
      data: res.data,
      status: res.status,
      message: (res.data as any)?.message,
    };
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

type QueryParams = Record<string, string | number | boolean>;

export const get = async <T>(
  url: string,
  privateReq = false,
  params?: QueryParams
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.get(url, { params }));
};

export const post = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.post(url, body));
};

export const put = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.put(url, body));
};

export const patch = async <T, B = unknown>(
  url: string,
  body?: B,
  privateReq = false
) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.patch(url, body));
};

export const del = async <T>(url: string, privateReq = false) => {
  const api = privateReq ? ApiPrivate : ApiPublic;
  return handleRequest<T>(api.delete(url));
};
