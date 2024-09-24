import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosHeaderValue,
  HeadersDefaults,
} from 'axios';
import { AxiosResponseData, ResponseApiError } from './types';

export abstract class BaseApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create(config);
  }

  public setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
  }

  public setHeaders(
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    }
  ) {
    this.axiosInstance.defaults.headers = headers;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public cleanRequest<T>(
    options: AxiosRequestConfig
  ): Promise<AxiosResponseData<T>> {
    return this.axiosInstance.request(options);
  }

  protected request<T>(
    options: AxiosRequestConfig
  ): Promise<AxiosResponseData<T>> {
    const xForwardedFor = process.env.NEXT_X_FORWARDED_FOR;

    return this.axiosInstance
      .request({
        ...options,
        headers: {
          ...options.headers,
          /**
           * Allows to avoid `Failed to get information about the country
           * of the source IP.` error  when communicating
           * with games service locally
           */
          ...(xForwardedFor ? { 'X-Forwarded-For': xForwardedFor } : {}),
        },
      })
      .then(
        response => Promise.resolve(response.data),
        error => Promise.reject(this.formatError(error))
      );
  }

  protected formatError = (error: AxiosError): ResponseApiError => {
    return {
      code: error.code || 'Unknown code',
      statusText: error.response?.statusText || 'Unknown error',
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
  };
}
