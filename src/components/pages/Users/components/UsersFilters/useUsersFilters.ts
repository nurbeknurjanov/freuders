import { useForm } from 'react-hook-form';
import { IProps } from './UsersFilters';
import { IUserFiltersForm } from 'api/usersApi';
import { useAppSelector } from 'store/hooks';
import { FormEvent, useEffect, useRef } from 'react';
import { getUsersStateSelector } from 'store/users/selectors';
import { useTranslatedData } from 'shared/hooks';

export function useUsersFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IUserFiltersForm | null>(null);
  const getUsersState = useAppSelector(getUsersStateSelector);

  const { sexOptions, statusOptions } = useTranslatedData();
  const defaultValues: IUserFiltersForm = {
    name: null,
    email: null,
    status: [],
    sex: [],
    createdAt: [null, null],
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IUserFiltersForm>({
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      setValue(key as keyof typeof filters, value);
    });
  }, [filters, setValue]);

  const submitForm = (formData: IUserFiltersForm) => setFilters(formData);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    handleSubmit(submitForm)(event);
  };

  useEffect(() => {
    if (getUsersState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getUsersState.isFetching]);

  return {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    setValue,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
    statusOptions,
    sexOptions,
  };
}
