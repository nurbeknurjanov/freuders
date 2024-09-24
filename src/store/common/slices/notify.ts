import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import { AlertColor } from '@mui/material';

type Nullable<T> = { [K in keyof T]: T[K] | null };
export type NotifyType = {
  text: string;
  type: AlertColor;
};

const initialState: Nullable<NotifyType> = {
  text: null,
  type: null,
};

const { actions, reducer } = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    set: (state, action: PayloadAction<NotifyType>) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
      return state;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.notify,
};

export const notify = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
