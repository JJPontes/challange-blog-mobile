export interface Pagination {
  total: number;
  totalPages: number;
  registersPerPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
  firstPage: number;
  lastPage: number;
}
