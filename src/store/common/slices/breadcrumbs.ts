import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import { LinkProps as MuiLinkProps } from '@mui/material';
import { LinkProps as NextLinkProps } from 'next/link';

export type BreadcrumbsStateType = {
  items: (({ label: string } & MuiLinkProps & NextLinkProps) | string)[];
};

const initialState: BreadcrumbsStateType = {
  items: [],
};

const { actions, reducer } = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    set: (state, action: PayloadAction<BreadcrumbsStateType['items']>) => {
      return {
        ...state,
        items: action.payload,
      };
      //state = {items: []} won't work
      //state.items = action.payload; must mutate
      //return is unnecessary
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.breadcrumbs,
  items: (state: RootStateType) => state.common.breadcrumbs.items,
};

export const breadcrumbs = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
