import {
  ISort,
  Nullable,
  ResponseApiError,
  ResponseDataListPagination,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';
import { IProduct } from 'api/productsApi';

export interface IFile {
  _id: string;
  modelName: 'Product';
  modelId: string;
  data: {
    type: 'image';
  };
  ext: string;
  originalFileName: string;
  url: string;
  model: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IFilePost {
  data: {
    type: 'image';
  };
  fileField: FileList;

  //lazy identify which product it relates
  modelName?: 'Product';
  modelId?: string;
}

type IFileWithoutSystemFields = Omit<IFile, '_id' | 'data' | 'url' | 'model'>;
export type IFileFilters = Partial<Nullable<IFileWithoutSystemFields>> & {
  id?: string | null;
  type?: string | null;
  modelSearch?: string | null;
};
export type IFileSortFields = keyof IFileWithoutSystemFields;
export interface IFileSort extends ISort<IFileSortFields> {}

export type IFilesList = ResponseDataListPagination<IFile>;

export type IFileApiConfig = AxiosRequestConfig;
export interface IFileApiError extends ResponseApiError<{ message: string }> {}
