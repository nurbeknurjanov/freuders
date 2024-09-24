import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  LoginRequestBodyParams,
  LoginResponse,
  CommonApiConfig,
  CommonApiError,
} from 'api/commonApi';
import { commonApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';
import { isEqual } from 'lodash';

export interface LoginStateType
  extends MergeResponseState<LoginResponse, CommonApiError> {}

const selector = {
  state: (state: RootStateType) => state.common.login,
  isFetching: (state: RootStateType) => state.common.login.isFetching,
  data: (state: RootStateType) => state.common.login.data,
  error: (state: RootStateType) => state.common.login.error,
};

const initialState: LoginStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@common/login';

let previousQuery: LoginRequestBodyParams;
const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      body,
      config,
    }: {
      body: LoginRequestBodyParams;
      config?: CommonApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return commonApi.login(body, config).catch(rejectWithValue);
  },
  {
    condition: (payload, { getState }) => {
      previousQuery = payload.body;
      if (!isEqual(previousQuery, payload.body)) {
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
    reset() {
      return initialState;
    },
    set(state, action: PayloadAction<LoginStateType>) {
      return action.payload;
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

interface LoginType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const login: LoginType = {
  actions: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
