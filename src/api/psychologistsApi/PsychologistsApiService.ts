import { AxiosRequestConfig } from 'axios';
import {
  AxiosResponseData,
  BaseApiService,
  RequestParamsFreuders,
} from 'api/baseApi';
import {
  IPsychologistSort,
  IPsychologistFilters,
  IPsychologistsList,
  IPsychologistApiConfig,
} from './types';

export class PsychologistsApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getPsychologists(
    query: RequestParamsFreuders<IPsychologistFilters, IPsychologistSort>,
    config?: IPsychologistApiConfig
  ): Promise<AxiosResponseData<IPsychologistsList>> {
    const { filters, sort, pagination } = query;
    return this.request<IPsychologistsList>({
      method: 'get',
      url: '/api/search/specialists',
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
}
