export interface Category {
  id: string;
  name: string;
}

export interface CategoryResponse {
  status: string;
  details: Category[];
}
