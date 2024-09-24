import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import type { IUser } from 'api/usersApi';

export type AuthStateType = {
  isAuth: boolean | null;
  user: IUser | null;
  newAccessToken?: string | null;
};
const initialState: AuthStateType = {
  isAuth: null,
  user: null,
  newAccessToken: null,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    resetNewAccessToken(state) {
      return { ...state, newAccessToken: null };
    },
    set: (state, action: PayloadAction<AuthStateType>) => {
      state = action.payload;
      return state;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.auth,
  isAuth: (state: RootStateType) => state.common.auth.isAuth,
  user: (state: RootStateType) => state.common.auth.user,
};

export const auth = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
