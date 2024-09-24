'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { users } from 'store';
import { getUserThunk } from 'store/users/thunks';
import { getUserStateSelector } from 'store/users/selectors';

export function useUserModel({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const getUserState = useAppSelector(getUserStateSelector);
  const model = getUserState.data;

  const getUser = useCallback(
    async (id: string) => {
      await dispatch(getUserThunk(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id, getUser, dispatch]);

  useEffect(
    () => () => {
      dispatch(users.getUser.actions.reset());
    },
    [dispatch]
  );

  return {
    model,
    getUserState,
  };
}
