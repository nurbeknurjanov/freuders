import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ISubjectApiConfig,
  ISubjectsList,
  ISubjectApiError,
} from 'api/subjectsApi';
import { subjectsApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';

export interface GetSubjectsStateType
  extends MergeResponseState<ISubjectsList, ISubjectApiError> {}

const selector = {
  state: (state: RootStateType) => state.subjects.getSubjects,
  isFetching: (state: RootStateType) => state.subjects.getSubjects.isFetching,
  data: (state: RootStateType) => state.subjects.getSubjects.data,
  error: (state: RootStateType) => state.subjects.getSubjects.error,
};

const initialState: GetSubjectsStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@subjects/getSubjects';

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      config,
    }: {
      config?: ISubjectApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return subjectsApi.getSubjects(config).catch(rejectWithValue);
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
      state.error = action.payload as ISubjectApiError;
    });
  },
});

interface GetSubjectsType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getSubjectsObject: GetSubjectsType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
