import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestParams } from 'api/baseApi';
import {
  IUserApiConfig,
  IUsersList,
  IUserFilters,
  IUserSort,
  IUserApiError,
} from 'api/usersApi';
import { usersApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';
import { isEqual } from 'lodash';

export interface GetUsersStateType
  extends MergeResponseState<IUsersList, IUserApiError> {}

const selector = {
  state: (state: RootStateType) => state.users.getUsers,
  isFetching: (state: RootStateType) => state.users.getUsers.isFetching,
  data: (state: RootStateType) => state.users.getUsers.data,
  error: (state: RootStateType) => state.users.getUsers.error,
};

const initialState: GetUsersStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@users/getUsers';

let previousQuery: RequestParams<IUserFilters, IUserSort>;
const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      query,
      config,
    }: {
      query: RequestParams<IUserFilters, IUserSort>;
      config?: IUserApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return usersApi.getUsers(query, config).catch(rejectWithValue);
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
      state.error = action.payload as IUserApiError;
    });
  },
});

interface GetUsersType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getUsersObject: GetUsersType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
