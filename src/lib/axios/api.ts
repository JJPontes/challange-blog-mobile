import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Se estiver usando react-native-dotenv ou similar para as envs
import { API_URL, API_TIMEOUT } from '@env';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Configurações base
const config = {
  baseURL: API_URL,
  timeout: Number(API_TIMEOUT) || 10000,
  headers: { 'Content-Type': 'application/json' },
};

export const ApiPublic = axios.create(config);
export const ApiPrivate = axios.create(config);

/**
 * Interceptor para requisições privadas
 * No React Native, o AsyncStorage é assíncrono, 
 * então o interceptor deve ser async.
 */
ApiPrivate.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao recuperar token', error);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
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
    // No mobile, é comum fazer log do erro para debug
    throw new Error(getErrorMessage(err));
  }
}

// No React Native, preferimos Record ou o tipo do Axios para Params
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