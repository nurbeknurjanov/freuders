import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IFileApiConfig, IFileApiError, IFile } from 'api/filesApi';
import { filesApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface DeleteFileStateType
  extends MergeResponseState<IFile, IFileApiError> {}

const selector = {
  state: (state: RootStateType) => state.files.deleteFile,
  isFetching: (state: RootStateType) => state.files.deleteFile.isFetching,
  data: (state: RootStateType) => state.files.deleteFile.data,
  error: (state: RootStateType) => state.files.deleteFile.error,
};

const initialState: DeleteFileStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@files/deleteFile';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      id,
      config,
    }: {
      id: string;
      config?: IFileApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return filesApi.deleteFile(id, config).catch(rejectWithValue);
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
      state.error = action.payload as IFileApiError;
    });
  },
});

interface DeleteFileType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const deleteFileObject: DeleteFileType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
