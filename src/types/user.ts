import { Pagination } from './pagination';

export type Role = 'professor' | 'aluno';

export interface UserLogin {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role_id: string;
  role_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  roleName: string;
}

export interface UpdateUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleName: string;
}

export interface UserResponse {
  status: string;
  details: User | User[] | string;
  pagination?: Pagination;
}
