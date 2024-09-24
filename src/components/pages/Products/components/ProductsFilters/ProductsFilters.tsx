'use client';
import { useProductsFilters } from './useProductsFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import { IProductFilters } from 'api/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { isEqual } from 'lodash';

export interface IProps {
  filters: IProductFilters;
  setFilters: (_filters: IProductFilters) => void;
}
export const ProductsFilters = ({ filters, setFilters }: IProps) => {
  const {
    tCommon,
    tProduct,
    onSubmitForm,
    onResetForm,
    register,
    isDirty,
    isValid,
    getProductsState,
    previousFilters,
    watch,
  } = useProductsFilters({ filters, setFilters });

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          <TextField
            label={tProduct('name')}
            {...register('name')}
            InputLabelProps={{ shrink: !!watch('name') }}
          />
          <TextField
            label={tProduct('description')}
            {...register('description')}
            InputLabelProps={{ shrink: !!watch('description') }}
          />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={
              getProductsState.isFetching &&
              !isEqual(filters, previousFilters.current)
            }
            sx={{ minWidth: 100 }}
          >
            {tCommon('search')}
          </Button>
          <Button type={'reset'} variant={'outlined'} sx={{ ml: 1 }}>
            {tCommon('reset')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
