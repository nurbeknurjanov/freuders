import { AxiosRequestConfig } from 'axios';
import { RequestParams, AxiosResponseData, BaseApiService } from 'api/baseApi';
import {
  IUserSort,
  IUserFilters,
  IUsersList,
  IUserApiConfig,
  IUser,
  IUserPost,
} from './types';

export class UsersApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getUsers(
    query: RequestParams<IUserFilters, IUserSort>,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUsersList>> {
    const { filters, sort, pagination } = query;
    return this.request<IUsersList>({
      method: 'get',
      url: '/users',
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

  public getUser(
    id: string,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'get',
      url: '/users/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    }) /*.then(
      res => new Promise(resolve => setTimeout(() => resolve(res), 5000))
    )*/;
  }

  public createUser(
    body: IUserPost,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'post',
      url: '/users',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public updateUser(
    id: string,
    body: IUserPost,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'put',
      url: '/users/' + id,
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public updateProfile(
    body: IUserPost,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'put',
      url: '/users/profile',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public userChangePassword(
    id: string,
    body: Pick<IUserPost, 'password'>,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'put',
      url: `/users/${id}/change-password`,
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public profileChangePassword(
    body: Pick<IUserPost, 'password'>,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'put',
      url: `/users/profile/change-password`,
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public deleteUser(
    id: string,
    config?: IUserApiConfig
  ): Promise<AxiosResponseData<IUser>> {
    return this.request<IUser>({
      method: 'delete',
      url: '/users/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
