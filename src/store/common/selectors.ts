import { createSelector } from 'reselect';
import { RootStateType } from 'store/store';

export const getAuthStateSelector = (state: RootStateType) => state.common.auth;

export const getIsAuth = createSelector(getAuthStateSelector, data => {
  return data.isAuth;
});

export const getAuthUser = createSelector(getAuthStateSelector, data => {
  return data.user;
});
