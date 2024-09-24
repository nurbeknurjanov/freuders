import { FilesApiService } from './filesApi';
import { BASE_URL } from 'shared/utils';

export const filesApi = new FilesApiService({
  baseURL: BASE_URL,
});
