import { AuthStateType } from '../../common/slices';
import { RootStateType } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProductsPermissionsStateType {
  canViewProducts: boolean | null;
  canViewProduct: boolean | null;
  canCreateProduct: boolean | null;
  canUpdateProduct: boolean | null;
  canDeleteProduct: boolean | null;
}

const selector = {
  state: (state: RootStateType) => state.products.productsPermissions,
};

const initialState: ProductsPermissionsStateType = {
  canViewProducts: true,
  canViewProduct: true,
  canCreateProduct: false,
  canUpdateProduct: false,
  canDeleteProduct: false,
};

const SLICE_NAME = '@products/productsPermissions';
const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset(_state) {
      return initialState;
    },
    setPermissions(state, payloadAuthState: PayloadAction<AuthStateType>) {
      const { payload: authState } = payloadAuthState;

      state.canCreateProduct = authState.isAuth;
      state.canUpdateProduct = authState.isAuth;
      state.canDeleteProduct = authState.isAuth;
      return state;
    },
  },
});

interface ProductsPermissionsType {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
}

export const productsPermissions: ProductsPermissionsType = {
  actions,
  reducer,
  selector,
};
