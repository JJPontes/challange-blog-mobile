import { del, get, patch, post } from '../lib/axios/api';
import { CreateUser, UserResponse, UpdateUser } from '../types/user';
import { StatusResponse } from '../types/auth';

const base = '/user';

export const getall = (
  page: number = 1,
  limit: number = 10,
  orderBy: 'ASC' | 'DESC' = 'ASC'
) => {
  const query = `page=${page}&limit=${limit}&orderBy=${orderBy}`;
  return get<UserResponse>(`${base}?${query}`, true);
};

export const getUserById = (id: string) =>
  get<UserResponse>(`${base}/${id}`, false);

export const create = (userData: CreateUser) =>
  post<StatusResponse, CreateUser>(base, userData, true);

export const update = (userData: UpdateUser) =>
  patch<UserResponse, UpdateUser>(base + `/${userData.id}`, userData, true);

export const remove = (userId: string) =>
  del<UserResponse>(base + `/${userId}`, true);
