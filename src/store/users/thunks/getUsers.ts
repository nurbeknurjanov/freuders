import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import {
  IUserFiltersForm,
  IUserSort,
  IUserSortFields,
  IUserFilters,
} from 'api/usersApi';
import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import dayjs from 'dayjs';

export const getUsersThunk =
  (
    pagination: IPaginationRequest,
    formFilters: IUserFiltersForm,
    sorting: GridSortModel
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: IUserSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IUserSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    const { createdAt, ...rest } = formFilters;
    const filters: IUserFilters = rest;
    if (createdAt[0]) {
      filters.createdAtFrom = dayjs(createdAt[0]).hour(0).toISOString();
    }
    if (createdAt[1]) {
      filters.createdAtTo = dayjs(createdAt[1])
        .hour(23)
        .minute(59)
        .second(59)
        .toISOString();
    }

    await dispatch(
      users.getUsers.thunk.request({
        query: {
          pagination,
          filters,
          sort,
        },
      })
    );
    const { error } = users.getUsers.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }
  };
