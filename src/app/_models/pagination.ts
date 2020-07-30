export interface Pagination {
  CurrentPage: number;
  ItemsPerPage: number;
  TotalItems: number;
  TotalPages: number;
  MinAge: number;
  MaxAge: number;
}

export  class PaginatedResults<T>
{
  result: T;
  pagination: Pagination;
}
