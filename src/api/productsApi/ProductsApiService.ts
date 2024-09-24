import { AxiosRequestConfig } from 'axios';
import { RequestParams, AxiosResponseData, BaseApiService } from 'api/baseApi';
import {
  IProductSort,
  IProductFilters,
  IProductsList,
  IProductApiConfig,
  IProduct,
  IProductPost,
} from './types';

export class ProductsApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getProducts(
    query: RequestParams<IProductFilters, IProductSort>,
    config?: IProductApiConfig
  ): Promise<AxiosResponseData<IProductsList>> {
    const { filters, sort, pagination } = query;
    return this.request<IProductsList>({
      method: 'get',
      url: '/products',
      params: {
        ...pagination,
        ...(filters ? filters : {}),
        ...(sort ? sort : {}),
      },
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public getProduct(
    id: string,
    config?: IProductApiConfig
  ): Promise<AxiosResponseData<IProduct>> {
    return this.request<IProduct>({
      method: 'get',
      url: '/products/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    }) /*.then(
      res => new Promise(resolve => setTimeout(() => resolve(res), 5000))
    )*/;
  }

  public createProduct(
    body: IProductPost,
    config?: IProductApiConfig
  ): Promise<AxiosResponseData<IProduct>> {
    return this.request<IProduct>({
      method: 'post',
      url: '/products',
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public updateProduct(
    id: string,
    body: IProductPost,
    config?: IProductApiConfig
  ): Promise<AxiosResponseData<IProduct>> {
    return this.request<IProduct>({
      method: 'put',
      url: '/products/' + id,
      data: body,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }

  public deleteProduct(
    id: string,
    config?: IProductApiConfig
  ): Promise<AxiosResponseData<IProduct>> {
    return this.request<IProduct>({
      method: 'delete',
      url: '/products/' + id,
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  }
}
