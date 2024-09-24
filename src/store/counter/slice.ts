import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import { createAction } from '@reduxjs/toolkit';

const incrementEven = createAction<2 | 4 | 6 | 8 | 10>('counter/incrementEven');

interface CounterStateType {
  value: number;
}

const initialState: CounterStateType = {
  value: 0,
};

const { actions, reducer } = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: _state => {
      return initialState;
    },
    increment: state => {
      state.value += 1;
      return state;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      return state; //for redactor to not light
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      incrementEven /*"counter/incrementEven"*/,
      (state, payload) => {
        state.value += payload.payload;
      }
    );
  },
});

const selector = {
  state: (state: RootStateType) => state.counter,
  value: (state: RootStateType) => state.counter.value,
};

export const counter = {
  actions,
  reducer,
  selector,
  customActions: { incrementEven },
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
  customActions: { incrementEven: typeof incrementEven };
};
