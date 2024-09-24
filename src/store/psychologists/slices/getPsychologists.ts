import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestParamsFreuders } from 'api/baseApi';
import {
  IPsychologistApiConfig,
  IPsychologistsList,
  IPsychologistFilters,
  IPsychologistSort,
  IPsychologistApiError,
  IPsychologist,
} from 'api/psychologistsApi';
import { psychologistsApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';
import { isEqual } from 'lodash';

export interface GetPsychologistsStateType
  extends MergeResponseState<IPsychologistsList, IPsychologistApiError> {
  accumulatedItems: IPsychologist[];
}

const selector = {
  state: (state: RootStateType) => state.psychologists.getPsychologists,
  isFetching: (state: RootStateType) =>
    state.psychologists.getPsychologists.isFetching,
  data: (state: RootStateType) => state.psychologists.getPsychologists.data,
  error: (state: RootStateType) => state.psychologists.getPsychologists.error,
};

const initialState: GetPsychologistsStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
  accumulatedItems: [],
};

const SLICE_NAME = '@psychologists/getPsychologists';

let previousQuery: RequestParamsFreuders<
  IPsychologistFilters,
  IPsychologistSort
>;
const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      query,
      config,
    }: {
      query: RequestParamsFreuders<IPsychologistFilters, IPsychologistSort>;
      config?: IPsychologistApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return psychologistsApi
      .getPsychologists(query, config)
      .catch(rejectWithValue);
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
    resetAccumulatedItems(state) {
      return {
        ...state,
        accumulatedItems: [],
      };
    },
  },

  extraReducers: builder => {
    builder.addCase(requestThunk.pending, state => {
      Object.assign(state, getFetchingResponseState());
    });
    builder.addCase(requestThunk.fulfilled, (state, action) => {
      Object.assign(state, getFetchedResponseState());
      state.accumulatedItems = [
        ...state.accumulatedItems,
        ...action.payload.items,
      ];
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(requestThunk.rejected, (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload as IPsychologistApiError;
    });
  },
});

interface GetPsychologistsType {
  actions: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getPsychologistsObject: GetPsychologistsType = {
  actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
