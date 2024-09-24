import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserApiConfig, IUser, IUserApiError, IUserPost } from 'api/usersApi';
import { usersApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface UserChangePasswordStateType
  extends MergeResponseState<IUser, IUserApiError> {}

const selector = {
  state: (state: RootStateType) => state.users.userChangePassword,
  isFetching: (state: RootStateType) =>
    state.users.userChangePassword.isFetching,
  data: (state: RootStateType) => state.users.userChangePassword.data,
  error: (state: RootStateType) => state.users.userChangePassword.error,
};

const initialState: UserChangePasswordStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@users/userChangePassword';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      id,
      body,
      config,
    }: {
      id: string;
      body: Pick<IUserPost, 'password'>;
      config?: IUserApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return usersApi.userChangePassword(id, body, config).catch(rejectWithValue);
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
      state.error = action.payload as IUserApiError;
    });
  },
});

interface UserChangePasswordType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const userChangePasswordObject: UserChangePasswordType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
