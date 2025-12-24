import { post, ApiResponse } from '../lib/axios/api';
import { CreateUser } from '../types/user';
import { StatusResponse } from '../types/auth';

const base = '/user';

export const create = (userData: CreateUser) =>
  post<StatusResponse, CreateUser>(base, userData, true);
