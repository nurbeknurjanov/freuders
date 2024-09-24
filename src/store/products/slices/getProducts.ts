import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestParams } from 'api/baseApi';
import {
  IProductApiConfig,
  IProductsList,
  IProductFilters,
  IProductSort,
  IProductApiError,
} from 'api/productsApi';
import { productsApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';
import { isEqual } from 'lodash';

export interface GetProductsStateType
  extends MergeResponseState<IProductsList, IProductApiError> {}

const selector = {
  state: (state: RootStateType) => state.products.getProducts,
  isFetching: (state: RootStateType) => state.products.getProducts.isFetching,
  data: (state: RootStateType) => state.products.getProducts.data,
  error: (state: RootStateType) => state.products.getProducts.error,
};

const initialState: GetProductsStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@products/getProducts';

let previousQuery: RequestParams<IProductFilters, IProductSort>;
const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      query,
      config,
    }: {
      query: RequestParams<IProductFilters, IProductSort>;
      config?: IProductApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return productsApi.getProducts(query, config).catch(rejectWithValue);
  },
  {
    condition: (payload, { getState }) => {
      previousQuery = payload.query;
      if (!isEqual(previousQuery, payload.query)) {
        return true;
      }

      if (selector.isFetching(getState() as RootStateType)) {
        return false; //caching
      }

      return true;
    },
  }
);

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset(_state) {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder.addCase(requestThunk.pending, state => {
      Object.assign(state, getFetchingResponseState());
    });
    builder.addCase(requestThunk.fulfilled, (state, action) => {
      Object.assign(state, getFetchedResponseState());
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(requestThunk.rejected, (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload as IProductApiError;
    });
  },
});

interface GetProductsType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getProductsObject: GetProductsType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
