'use client';
import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createStore, RootStateType } from 'store/store';

export const StoreProvider: FC<
  PropsWithChildren & { initialState: RootStateType }
> = ({ children, initialState }) => {
  const clientStore = createStore(initialState);
  return <Provider store={clientStore}>{children}</Provider>;
};
