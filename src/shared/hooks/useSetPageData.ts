import type {
  BreadcrumbsStateType,
  ButtonsContentType,
} from 'store/common/slices';
import { useEffect } from 'react';
import { common } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { isEqual } from 'lodash';

export const useSetPageData = (
  title?: string,
  breadcrumbItems?: BreadcrumbsStateType['items'],
  buttons?: ButtonsContentType
) => {
  const dispatch = useAppDispatch();
  const breadcrumbItemsStore = useAppSelector(
    common.breadcrumbs.selector.items
  );

  useEffect(() => {
    if (title) {
      dispatch(common.title.actions.set({ title }));
    }
  }, [dispatch, title]);

  useEffect(() => {
    if (breadcrumbItems) {
      if (isEqual(breadcrumbItems, breadcrumbItemsStore)) return;

      dispatch(common.breadcrumbs.actions.set(breadcrumbItems));
    }
  }, [dispatch, breadcrumbItems, breadcrumbItemsStore]);

  useEffect(() => {
    if (buttons) {
      dispatch(common.buttonsContent.actions.set(buttons));
    }
  }, [dispatch, buttons]);
};
