import { usePsychologistsFilters } from './usePsychologistsFilters';
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import {
  IPsychologistFiltersForm,
  specialityOptions,
} from 'api/psychologistsApi';
import { isEqual } from 'lodash';
import styles from './psychologistFilters.module.scss';

export interface IProps {
  filters: IPsychologistFiltersForm;
  setFilters: (_filters: IPsychologistFiltersForm) => void;
}

export const PsychologistsFilters = ({ filters, setFilters }: IProps) => {
  const {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    getPsychologistsState,
    previousFilters,
    sexOptions,
    ageOptions,
    subjectsOptions,
  } = usePsychologistsFilters({ filters, setFilters });

  return (
    <form
      className={styles.filtersContent}
      onSubmit={onSubmitForm}
      onReset={onResetForm}
    >
      <FormControl>
        <FormLabel>Ищу психолога</FormLabel>
        <Select value={watch('sex')} displayEmpty {...register('sex')}>
          <MenuItem value={''}>Любого пола</MenuItem>
          {Object.entries(sexOptions).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={styles.rowAgeContainer}>
        <FormLabel>В возрасте</FormLabel>
        <div className={styles.rowAge}>
          <FormControl className={styles.formControlAge}>
            <FormLabel>От</FormLabel>
            <Select
              value={watch('age.0')}
              displayEmpty
              {...register('age.0')}
              className={styles.from}
            >
              {ageOptions.map(el => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles.formControlAge}>
            <FormLabel>До</FormLabel>
            <Select
              value={watch('age.1')}
              displayEmpty
              {...register('age.1')}
              className={styles.to}
            >
              {ageOptions.map(el => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </FormControl>

      <FormControl>
        <FormLabel>Тема</FormLabel>
        <Select
          value={watch('subjectId')}
          displayEmpty
          {...register('subjectId')}
        >
          <MenuItem value={''}>Любая тема</MenuItem>
          {subjectsOptions?.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Квалификация</FormLabel>
        <Select
          value={watch('profSpeciality')}
          displayEmpty
          {...register('profSpeciality')}
        >
          <MenuItem value={''}>Все варианты</MenuItem>
          {Object.entries(specialityOptions).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Рейтинг</FormLabel>
        <Select displayEmpty value={watch('rating')} {...register('rating')}>
          <MenuItem value={''}>Не важен</MenuItem>
          <MenuItem value={'40-59'}>40-59</MenuItem>
          <MenuItem value={'60-79'}>60-79</MenuItem>
          <MenuItem value={'80-100'}>80-100</MenuItem>
        </Select>
      </FormControl>

      <div className={styles.button}>
        <Button
          type={'submit'}
          variant={'contained'}
          loading={
            getPsychologistsState.isFetching &&
            !isEqual(filters, previousFilters.current)
          }
          sx={{ minWidth: 100 }}
        >
          Показать анкеты
        </Button>
      </div>
    </form>
  );
};
