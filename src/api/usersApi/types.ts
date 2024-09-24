import {
  ISort,
  Nullable,
  ResponseApiError,
  ResponseDataListPagination,
} from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';

export enum SEX_ENUM {
  MALE = 1,
  FEMALE = 0,
}

export const sexOptions = {
  [SEX_ENUM.MALE]: 'Male',
  [SEX_ENUM.FEMALE]: 'Female',
};

export enum STATUS_ENUM {
  ENABLED = 1,
  DISABLED = 0,
}
export const statusOptions = {
  [STATUS_ENUM.ENABLED]: 'Enabled',
  [STATUS_ENUM.DISABLED]: 'Disabled',
};

export type IUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  sex: SEX_ENUM;
  status: STATUS_ENUM;
  createdAt: string;
  updatedAt: string;
};

type IUserWithoutSystemFields = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
export interface IUserPost extends Nullable<IUserWithoutSystemFields> {}
export interface IUserFilters
  extends Omit<Partial<Nullable<IUserWithoutSystemFields>>, 'status' | 'sex'> {
  id?: string | null;
  status?: STATUS_ENUM[];
  sex?: SEX_ENUM[];
  createdAtFrom?: string;
  createdAtTo?: string;
}
export interface IUserFiltersForm
  extends Omit<IUserFilters, 'createdAtFrom' | 'createdAtTo'> {
  createdAt: DateRange<Dayjs>;
}

export type IUserSortFields = keyof IUserWithoutSystemFields;
export interface IUserSort extends ISort<IUserSortFields> {}

export type IUsersList = ResponseDataListPagination<IUser>;

export type IUserApiConfig = AxiosRequestConfig;

export interface IUserApiError
  extends ResponseApiError<{
    message: string;
    fieldsErrors: Record<string, string>;
  }> {}
