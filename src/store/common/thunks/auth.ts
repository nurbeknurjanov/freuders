import { AuthStateType } from '../slices';
import { common, products } from 'store';
import type { AppThunk } from 'store/store';
export const authorize =
  (data: Omit<AuthStateType, 'isAuth'>): AppThunk =>
  dispatch => {
    dispatch(common.auth.actions.set({ ...data, isAuth: true }));
    dispatch(
      products.productsPermissions.actions.setPermissions({
        ...data,
        isAuth: true,
      })
    );
  };

export const logout = (): AppThunk => dispatch => {
  dispatch(common.auth.actions.reset());
  dispatch(products.productsPermissions.actions.reset());
};
