import { AxiosRequestConfig } from 'axios';
import { RequestParams, AxiosResponseData, BaseApiService } from 'api/baseApi';
import {
  IFileSort,
  IFileFilters,
  IFilesList,
  IFileApiConfig,
  IFile,
  IFilePost,
} from './types';
import { omit } from 'lodash';

export class FilesApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getFiles(
    query: RequestParams<IFileFilters, IFileSort>,
    config?: IFileApiConfig
  ): Promise<AxiosResponseData<IFilesList>> {
    const { filters, sort, pagination } = query;
    return this.request<IFilesList>({
      method: 'get',
      url: '/files',
      params: {
        ...pagination,
        ...(sort ? sort : {}),
        ...(filters ? filters : {}),
      },
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public getFile(
    id: string,
    config?: IFileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    return this.request<IFile>({
      method: 'get',
      url: '/files/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public createFile(
    body: IFilePost,
    config?: IFileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    const formData = new FormData();
    for (const key in omit(body, 'fileField')) {
      if (key === 'data') {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        const value = body[key as keyof IFilePost];
        formData.append(key, value as string);
      }
    }
    formData.append('fileField', body.fileField[0]);

    return this.request<IFile>({
      method: 'post',
      url: '/files/upload',
      data: formData,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public deleteFile(
    id: string,
    config?: IFileApiConfig
  ): Promise<AxiosResponseData<IFile>> {
    return this.request<IFile>({
      method: 'delete',
      url: '/files/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
