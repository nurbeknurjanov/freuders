import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserApiConfig, IUser, IUserApiError } from 'api/usersApi';
import { usersApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface GetUserStateType
  extends MergeResponseState<IUser, IUserApiError> {}

const selector = {
  state: (state: RootStateType) => state.users.getUser,
  isFetching: (state: RootStateType) => state.users.getUser.isFetching,
  data: (state: RootStateType) => state.users.getUser.data,
  error: (state: RootStateType) => state.users.getUser.error,
};

const initialState: GetUserStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@users/getUser';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      id,
      config,
    }: {
      id: string;
      config?: IUserApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return usersApi.getUser(id, config).catch(rejectWithValue);
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
      state.error = action.payload as IUserApiError;
    });
  },
});

interface GetUserType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getUserObject: GetUserType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
