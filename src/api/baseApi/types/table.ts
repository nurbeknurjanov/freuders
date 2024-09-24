export interface ISort<Fields extends string> {
  sortDirection?: 'asc' | 'desc';
  sortField?: Fields;
}

export interface IPagination {
  pageNumber: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface IPaginationRequest
  extends Omit<IPagination, 'total' | 'pageCount'> {}

export interface IPaginationRequestFreuders {
  offset: number;
  limit: number;
}

//export type Nullable<T> = T | null;
/*export type Nullable<T extends Record<string, any>> = {
  [key in string]: T[key] | null;
};*/

export type Nullable<T extends Record<string, any>> =
  T extends Record<infer K, infer Any>
    ? {
        [key in K]: T[key] | Any | null;
      }
    : never;
