import { ISort, Nullable, ResponseApiError } from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export enum SEX_ENUM {
  MALE = 1,
  FEMALE = 2,
}

export enum SPECIALITY_ENUM {
  CONSULTANT = 1,
  SEXOLOGIST = 2,
  COUCH = 3,
}

export const sexOptions = {
  [SEX_ENUM.MALE]: 'Male',
  [SEX_ENUM.FEMALE]: 'Female',
};

export const specialityOptions = {
  [SPECIALITY_ENUM.CONSULTANT]: 'Консультант',
  [SPECIALITY_ENUM.SEXOLOGIST]: 'Сексолог',
  [SPECIALITY_ENUM.COUCH]: 'Коуч',
};

export enum STATUS_ENUM {
  ENABLED = 1,
  DISABLED = 0,
}
export const statusOptions = {
  [STATUS_ENUM.ENABLED]: 'Enabled',
  [STATUS_ENUM.DISABLED]: 'Disabled',
};

export type IPsychologist = {
  _id: string;
  name: string;
  age: number;
  rating: number;
  sex: SEX_ENUM;
  subjectId: string;
  profSpeciality: SPECIALITY_ENUM;
  photoUrl: string;
  defaultSubjectName: string;
  subjectsCount: number;
  onlineStatus: STATUS_ENUM;
  lastActivityTime: string;
};

type IPsychologistWithoutSystemFields = Omit<
  IPsychologist,
  '_id' | 'createdAt' | 'updatedAt'
>;
export interface IPsychologistPost
  extends Nullable<IPsychologistWithoutSystemFields> {}
export interface IPsychologistFilters
  extends Omit<
    Partial<Nullable<IPsychologistWithoutSystemFields>>,
    'status' | 'sex' | 'age' | 'rating'
  > {
  id?: string | null;
  sex?: SEX_ENUM | '';
  ageFrom?: number;
  ageTo?: number;
  ratingFrom?: number;
  ratingTo?: number;
  profSpeciality?: SPECIALITY_ENUM | '';
}
export interface IPsychologistFiltersForm
  extends Omit<IPsychologistFilters, 'createdAtFrom' | 'createdAtTo'> {
  age: {
    '0': number | '';
    '1': number | '';
  };
  rating: string;
}

export type IPsychologistSortFields = keyof IPsychologistWithoutSystemFields;
export interface IPsychologistSort extends ISort<IPsychologistSortFields> {}

export type IPsychologistsList = {
  items: IPsychologist[];
  totalCount: number;
};

export type IPsychologistApiConfig = AxiosRequestConfig;

export interface IPsychologistApiError
  extends ResponseApiError<{
    message: string;
    fieldsErrors: Record<string, string>;
  }> {}
