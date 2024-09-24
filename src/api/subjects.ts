import { SubjectsApiService } from './subjectsApi';
import { PSYCHOLOGIST_URL } from 'shared/utils';

export const subjectsApi = new SubjectsApiService({
  baseURL: PSYCHOLOGIST_URL,
});
