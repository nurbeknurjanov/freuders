'use client';
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { psychologists } from 'store';
import { getPsychologistsThunk } from 'store/psychologists/thunks';
import { getPsychologistsStateSelector } from 'store/psychologists/selectors';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { useTableStates } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IPsychologistFiltersForm } from 'api/psychologistsApi';

//const env = process.env.NODE_ENV;
export function usePsychologists() {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tPsychologist = useTranslations('Psychologist');
  const tPsychologistsPage = useTranslations('PsychologistsPage');
  const tProfilePage = useTranslations('ProfilePage');

  const getPsychologistsState = useAppSelector(getPsychologistsStateSelector);

  const {
    pagination,
    setPagination,
    previousPagination,
    sorting,
    setSorting,
    previousSorting,
    filters,
    setFilters,
    previousFilters,
    refreshListKey,
    refreshList,
    previousRefreshListKey,
  } = useTableStates<IPsychologistFiltersForm>(
    ['name', 'age', 'sex', 'subjectId', 'profSpeciality', 'rating'],
    [],
    ['age'],
    ['rating']
  );

  const getPsychologists = useCallback(
    (
      pagination: IPaginationRequest,
      filters: IPsychologistFiltersForm,
      sorting: GridSortModel
    ) =>
      dispatch(
        getPsychologistsThunk(
          {
            offset: pagination.pageNumber * pagination.pageSize,
            limit: pagination.pageSize,
          },
          filters,
          sorting
        )
      ),
    [dispatch]
  );

  useEffect(() => {
    if (
      isEqual(previousPagination.current, pagination) &&
      isEqual(previousFilters.current, filters) &&
      isEqual(previousSorting.current, sorting) &&
      isEqual(previousRefreshListKey.current, refreshListKey)
    )
      return;

    if (
      !isEqual(previousFilters.current, filters) ||
      pagination.pageNumber === 0
    ) {
      dispatch(psychologists.getPsychologists.actions.resetAccumulatedItems());
    }

    getPsychologists(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getPsychologists,
    refreshListKey,
    previousPagination,
    previousSorting,
    previousFilters,
    previousRefreshListKey,
    dispatch,
  ]);

  useEffect(() => {
    previousPagination.current = pagination;
  }, [pagination, previousPagination]);
  useEffect(() => {
    previousFilters.current = filters;
  }, [filters, previousFilters]);
  useEffect(() => {
    previousSorting.current = sorting;
  }, [sorting, previousSorting]);
  useEffect(() => {
    previousRefreshListKey.current = refreshListKey;
  }, [refreshListKey, previousRefreshListKey]);

  useEffect(
    () => () => {
      dispatch(psychologists.getPsychologists.actions.reset());
    },
    [dispatch]
  );

  return {
    tCommon,
    tPsychologist,
    tPsychologistsPage,
    tProfilePage,
    getPsychologistsState,
    pagination,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
  };
}
