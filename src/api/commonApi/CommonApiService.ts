import { AxiosRequestConfig } from 'axios';
import { AxiosResponseData, BaseApiService } from 'api/baseApi';
import {
  LoginRequestBodyParams,
  LoginResponse,
  CommonApiConfig,
} from './types';

export class CommonApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public login(
    body: LoginRequestBodyParams,
    config?: CommonApiConfig
  ): Promise<AxiosResponseData<LoginResponse>> {
    return this.request<LoginResponse>({
      method: 'post',
      url: '/auth/login',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public getAccessToken(
    config?: CommonApiConfig
  ): Promise<AxiosResponseData<string>> {
    return this.request<string>({
      method: 'get',
      url: '/auth/get-access-token',
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
