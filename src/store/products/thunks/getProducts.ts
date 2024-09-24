import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import {
  IProductFilters,
  IProductSort,
  IProductSortFields,
} from 'api/productsApi';
import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';

export const getProductsThunk =
  (
    pagination: IPaginationRequest,
    filters: IProductFilters,
    sorting: GridSortModel
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: IProductSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IProductSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    await dispatch(
      products.getProducts.thunk.request({
        query: {
          pagination,
          filters,
          sort,
        },
      })
    );
    const { error } = products.getProducts.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }
  };
