import { RootStateType } from 'store/store';
import { createSelector } from 'reselect';

export const getUsersStateSelector = (state: RootStateType) =>
  state.users.getUsers;

export const getUserStateSelector = (state: RootStateType) =>
  state.users.getUser;

export const getUserSelector = createSelector(
  getUserStateSelector,
  userState => {
    return userState.data;
  }
);
