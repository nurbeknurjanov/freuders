import { ReactNode } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';

export type ButtonsContentType = ReactNode;

const initialState: ButtonsContentType = null as ButtonsContentType;

const { actions, reducer } = createSlice({
  name: 'buttonsContent',
  initialState,
  reducers: {
    reset: _state => {
      return initialState;
    },
    set: (state, action: PayloadAction<ButtonsContentType>) => {
      return action.payload;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.buttonsContent,
};

export const buttonsContent = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
