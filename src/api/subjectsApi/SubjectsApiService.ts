import { AxiosRequestConfig } from 'axios';
import { AxiosResponseData, BaseApiService } from 'api/baseApi';
import { ISubjectsList, ISubjectApiConfig } from './types';

export class SubjectsApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getSubjects(
    config?: ISubjectApiConfig
  ): Promise<AxiosResponseData<ISubjectsList>> {
    return this.request<ISubjectsList>({
      method: 'get',
      url: '/api/subjects',
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
