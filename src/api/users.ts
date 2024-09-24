import { UsersApiService } from './usersApi';
import { BASE_URL } from 'shared/utils';

export const usersApi = new UsersApiService({
  baseURL: BASE_URL,
});
