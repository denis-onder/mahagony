export interface PaginatedResponse<T> {
  results: Array<T>;
  count: number;
  totalPages: number;
  currentPage: number;
}
