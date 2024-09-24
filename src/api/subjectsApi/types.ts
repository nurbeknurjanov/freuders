import { ResponseApiError } from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export type ISubject = {
  id: string;
  name: string;
  sequence: number;
};

export type ISubjectsList = ISubject[];

export type ISubjectApiConfig = AxiosRequestConfig;

export interface ISubjectApiError
  extends ResponseApiError<{
    message: string;
    fieldsErrors: Record<string, string>;
  }> {}
