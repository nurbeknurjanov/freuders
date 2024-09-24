import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IProductApiConfig, IProductApiError, IProduct } from 'api/productsApi';
import { productsApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface DeleteProductStateType
  extends MergeResponseState<IProduct, IProductApiError> {}

const selector = {
  state: (state: RootStateType) => state.products.deleteProduct,
  isFetching: (state: RootStateType) => state.products.deleteProduct.isFetching,
  data: (state: RootStateType) => state.products.deleteProduct.data,
  error: (state: RootStateType) => state.products.deleteProduct.error,
};

const initialState: DeleteProductStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@products/deleteProduct';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      id,
      config,
    }: {
      id: string;
      config?: IProductApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return productsApi.deleteProduct(id, config).catch(rejectWithValue);
  },
  {
    condition: (payload, { getState }) => {
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

interface DeleteProductType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const deleteProductObject: DeleteProductType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
