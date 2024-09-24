import { ProductsApiService } from './productsApi';
import { BASE_URL } from 'shared/utils';

export const productsApi = new ProductsApiService({
  baseURL: BASE_URL,
});
