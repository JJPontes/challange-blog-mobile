import { get } from '../lib/axios/api';
import type { CategoryResponse } from '../types/category';

export const getAllCategories = () => get<CategoryResponse>('/category', false);
