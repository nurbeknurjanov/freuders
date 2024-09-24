import { IPaginationRequestFreuders } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import {
  IPsychologistFiltersForm,
  IPsychologistSort,
  IPsychologistSortFields,
} from 'api/psychologistsApi';
import { AppThunk } from 'store/store';
import { psychologists } from 'store';
import { notify } from 'store/common/thunks';

export const getPsychologistsThunk =
  (
    pagination: IPaginationRequestFreuders,
    formFilters: IPsychologistFiltersForm,
    sorting: GridSortModel
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: IPsychologistSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IPsychologistSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    const { age, rating, ...filters } = formFilters;
    if (age['0']) {
      filters.ageFrom = age['0'];
    }
    if (age['1']) {
      filters.ageTo = age['1'];
    }

    if (rating) {
      const [ratingFrom, ratingTo] = rating.split('-');
      filters.ratingFrom = Number(ratingFrom);
      filters.ratingTo = Number(ratingTo);
    }

    await dispatch(
      psychologists.getPsychologists.thunk.request({
        query: {
          pagination,
          filters,
          sort,
        },
      })
    );
    const { error } = psychologists.getPsychologists.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }
  };
