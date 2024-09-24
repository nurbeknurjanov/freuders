'use client';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files } from 'store';
import { getFilesThunk } from 'store/files/thunks';
import { getFilesStateSelector } from 'store/files/selectors';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { useTableStates } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IFileFilters } from 'api/filesApi';

type ModalType = { type: 'delete'; id: string };

//const env = process.env.NODE_ENV;
export function useFiles() {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');
  const tFiles = useTranslations('FilesPage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  const getFilesState = useAppSelector(getFilesStateSelector);

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
  } = useTableStates<IFileFilters>(['id', 'type', 'modelSearch']);

  const getFiles = useCallback(
    (
      pagination: IPaginationRequest,
      filters: IFileFilters,
      sorting: GridSortModel
    ) => dispatch(getFilesThunk(pagination, filters, sorting)),
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

    getFiles(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getFiles,
    refreshListKey,
    previousPagination,
    previousSorting,
    previousFilters,
    previousRefreshListKey,
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
      dispatch(files.getFiles.actions.reset());
    },
    [dispatch]
  );

  return {
    tCommon,
    tFiles,
    tProductPage,
    getFilesState,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  };
}
