import { PsychologistsApiService } from './psychologistsApi';
import { PSYCHOLOGIST_URL } from 'shared/utils';

export const psychologistsApi = new PsychologistsApiService({
  baseURL: PSYCHOLOGIST_URL,
});
