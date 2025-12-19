import { post } from '../lib/axios/api';
import type { LoginRequest, LoginResponse } from '../types/auth';

export const sendLogin = (payload: LoginRequest) =>
  post<LoginResponse, LoginRequest>('/auth/login', payload, false);
