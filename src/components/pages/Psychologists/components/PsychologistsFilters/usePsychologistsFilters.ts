import { useForm } from 'react-hook-form';
import { IProps } from './PsychologistsFilters';
import { IPsychologistFiltersForm } from 'api/psychologistsApi';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { FormEvent, useEffect, useMemo, useRef } from 'react';
import { getPsychologistsStateSelector } from 'store/psychologists/selectors';
import { getSubjectsSelector } from 'store/subjects/selectors';
import { useTranslatedData } from 'shared/hooks';
import { getSubjectsThunk } from 'store/subjects/thunks';

export function usePsychologistsFilters({ filters, setFilters }: IProps) {
  const dispatch = useAppDispatch();

  const previousFilters = useRef<IPsychologistFiltersForm | null>(null);
  const getPsychologistsState = useAppSelector(getPsychologistsStateSelector);
  const getSubjectsData = useAppSelector(getSubjectsSelector);
  const subjectsOptions = useMemo(
    () => getSubjectsData?.map(el => ({ label: el.name, value: el.id })),
    [getSubjectsData]
  );

  const { sexOptions, statusOptions } = useTranslatedData();
  const defaultValues: IPsychologistFiltersForm = useMemo(
    () => ({
      name: null,
      subjectId: '',
      sex: '',
      age: {
        '0': 18,
        '1': 74,
      },
      rating: '',
      profSpeciality: '',
    }),
    []
  );
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<IPsychologistFiltersForm>({
      mode: 'onTouched',
      defaultValues,
    });

  useEffect(() => {
    Object.entries<IPsychologistFiltersForm[keyof IPsychologistFiltersForm]>(
      filters as unknown as {
        [s: string]: IPsychologistFiltersForm[keyof IPsychologistFiltersForm];
      }
    ).forEach(([key, value]) => {
      setValue(key as keyof IPsychologistFiltersForm, value);
    });

    if (!filters.age['0']) {
      setValue('age.0', defaultValues.age['0']);
    }
    if (!filters.age['1']) {
      setValue('age.1', defaultValues.age['1']);
    }
  }, [filters, setValue, defaultValues]);

  useEffect(() => {
    dispatch(getSubjectsThunk());
  }, [dispatch]);

  const submitForm = (formData: IPsychologistFiltersForm) =>
    setFilters(formData);

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
    if (getPsychologistsState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getPsychologistsState.isFetching]);

  const ageOptions = Array.from({ length: 82 }, (_, i) => i + 18);

  return {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    getPsychologistsState,
    previousFilters,
    statusOptions,
    sexOptions,
    ageOptions,
    subjectsOptions,
  };
}
