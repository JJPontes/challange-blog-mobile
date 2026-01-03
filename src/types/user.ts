export type Role = 'professor' | 'aluno';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
}
export interface CreateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  roleName: string;
}
