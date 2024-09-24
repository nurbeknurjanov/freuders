'use client';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { getUsersThunk } from 'store/users/thunks';
import { getUsersStateSelector } from 'store/users/selectors';
import { useTranslations } from 'next-intl';
import { IPaginationRequest } from 'api/baseApi';
import { isEqual } from 'lodash';
import { useTableStates } from 'shared/hooks';
import { GridSortModel } from '@mui/x-data-grid';
import { IUserFiltersForm } from 'api/usersApi';

type ModalType =
  | { type: 'create' }
  | { type: 'update' | 'delete' | 'view' | 'changePassword'; id: string };

//const env = process.env.NODE_ENV;
export function useUsers() {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');
  const tUsersPage = useTranslations('UsersPage');
  const tProfilePage = useTranslations('ProfilePage');

  const [showModal, setShowModal] = useState<ModalType | null>();
  const closeShowModal = useCallback(() => setShowModal(null), []);

  const getUsersState = useAppSelector(getUsersStateSelector);

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
  } = useTableStates<IUserFiltersForm>(
    ['name', 'email', 'status', 'sex', 'createdAt'],
    ['status', 'sex'],
    ['createdAt']
  );

  const getUsers = useCallback(
    (
      pagination: IPaginationRequest,
      filters: IUserFiltersForm,
      sorting: GridSortModel
    ) => dispatch(getUsersThunk(pagination, filters, sorting)),
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

    getUsers(pagination, filters, sorting);
  }, [
    pagination,
    sorting,
    filters,
    getUsers,
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
      dispatch(users.getUsers.actions.reset());
    },
    [dispatch]
  );

  return {
    tCommon,
    tUser,
    tUsersPage,
    tProfilePage,
    getUsersState,
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
