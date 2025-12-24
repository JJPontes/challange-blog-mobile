import { post, ApiResponse } from '../lib/axios/api';
import { UserCreate } from '../types/user';
import { StatusResponse } from '../types/auth';

const base = '/user';

export const create = (userData: UserCreate) =>
  post<StatusResponse, UserCreate>(base, userData, true);
