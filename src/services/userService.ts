import { post, ApiResponse } from '../lib/axios/api';
import { CreateUserPayload, User } from '../types/user';

const createEndpoints: Record<string, string> = {
  professor: '/api/professor',
  aluno: '/api/aluno',
};

export async function createNewUser(data: CreateUserPayload): Promise<User> {
  const endpoint = createEndpoints[data.role];
  if (!endpoint) {
    throw new Error(`Role inválida para criação: ${data.role}`);
  }

  const response: ApiResponse<User> = await post<User>(endpoint, data, true); 
  
  return response.data;
}