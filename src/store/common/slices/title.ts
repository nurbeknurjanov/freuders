import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';

type Nullable<T> = { [K in keyof T]: T[K] | null };
export type TitleType = {
  title: string;
  description?: string;
};

const initialState: Nullable<TitleType> = {
  title: null,
  description: null,
};

const { actions, reducer } = createSlice({
  name: 'title',
  initialState,
  reducers: {
    reset: _state => {
      return initialState;
    },
    set: (state, action: PayloadAction<TitleType>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.title,
  title: (state: RootStateType) => state.common.title.title,
  description: (state: RootStateType) => state.common.title.description,
};

export const title = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
