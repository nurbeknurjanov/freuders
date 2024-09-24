import {
  ResponseApiError,
  ResponseDataListPagination,
  ISort,
  Nullable,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';
import { IFile } from 'api/filesApi';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  imageId?: string;
  image?: IFile;
}
export type IProductWithoutSystemFields = Omit<
  IProduct,
  '_id' | 'createdAt' | 'updatedAt' | 'image' | 'imageId'
>;
export interface IProductPost extends Nullable<IProductWithoutSystemFields> {
  imageId?: string | null; // on product create, to keep ID of first created File
  imageFile?: FileList | null; //because imageFile is not required field
}
export interface IProductFilters
  extends Partial<Nullable<IProductWithoutSystemFields>> {
  id?: string | null;
}
export type IProductSortFields = keyof IProductWithoutSystemFields;
export interface IProductSort extends ISort<IProductSortFields> {}

export type IProductsList = ResponseDataListPagination<IProduct>;

export type IProductApiConfig = AxiosRequestConfig;
export interface IProductApiError
  extends ResponseApiError<{ message: string }> {}
