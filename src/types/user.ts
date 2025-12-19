export type Role = 'professor' | 'aluno';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role; 
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string; // Senha inicial
  role: Role;
  details?: string; 
}