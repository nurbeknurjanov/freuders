import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IProductApiConfig,
  IProduct,
  IProductApiError,
  IProductPost,
} from 'api/productsApi';
import { productsApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface UpdateProductStateType
  extends MergeResponseState<IProduct, IProductApiError> {}

const selector = {
  state: (state: RootStateType) => state.products.updateProduct,
  isFetching: (state: RootStateType) => state.products.updateProduct.isFetching,
  data: (state: RootStateType) => state.products.updateProduct.data,
  error: (state: RootStateType) => state.products.updateProduct.error,
};

const initialState: UpdateProductStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@products/updateProduct';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      id,
      body,
      config,
    }: {
      id: string;
      body: IProductPost;
      config?: IProductApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return productsApi.updateProduct(id, body, config).catch(rejectWithValue);
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
    reset() {
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

interface UpdateProductType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const updateProductObject: UpdateProductType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
