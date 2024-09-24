import { CommonApiService } from './commonApi';
import { BASE_URL } from 'shared/utils';

export const commonApi = new CommonApiService({
  baseURL: BASE_URL,
});
