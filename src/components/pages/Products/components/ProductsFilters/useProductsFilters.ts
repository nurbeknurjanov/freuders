import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilters';
import { IProductFilters } from 'api/productsApi';
import { useAppSelector } from 'store/hooks';
import { FormEvent, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { getProductStateSelector } from 'store/products/selectors';

export function useProductsFilters({ filters, setFilters }: IProps) {
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');

  const previousFilters = useRef<IProductFilters | null>(null);
  const getProductsState = useAppSelector(getProductStateSelector);

  const defaultValues: IProductFilters = { name: null, description: null };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IProductFilters>({
    mode: 'onTouched',
    defaultValues,
  });
  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const submitForm = (formData: IProductFilters) => setFilters(formData);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset(defaultValues);
    handleSubmit(submitForm)(event);
  };

  useEffect(() => {
    if (getProductsState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getProductsState.isFetching]);

  return {
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
  };
}
