import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommonApiConfig, CommonApiError } from 'api/commonApi';
import { commonApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface GetAccessTokenStateType
  extends MergeResponseState<string, CommonApiError> {}

const selector = {
  state: (state: RootStateType) => state.common.getAccessToken,
  isFetching: (state: RootStateType) => state.common.getAccessToken.isFetching,
  data: (state: RootStateType) => state.common.getAccessToken.data,
  error: (state: RootStateType) => state.common.getAccessToken.error,
};

const initialState: GetAccessTokenStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@common/getAccessToken';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      config,
    }: {
      config?: CommonApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return commonApi.getAccessToken(config).catch(rejectWithValue);
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
      state.error = action.payload as CommonApiError;
    });
  },
});

interface GetAccessTokenType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getAccessToken: GetAccessTokenType = {
  actions: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
