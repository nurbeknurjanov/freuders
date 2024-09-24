'use client';
import React, { FC, useEffect } from 'react';
import { common } from 'store';
import { useAppDispatch } from 'store/hooks';
import { withPageWrapper } from 'shared/hocs';
import { useTranslations } from 'next-intl';

let Home: FC = () => {
  const tHomePage = useTranslations('HomePage');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(common.title.actions.set({ title: tHomePage('title') }));
    return () => {
      dispatch(common.title.actions.reset());
    };
  }, [dispatch, tHomePage]);
  return (
    <>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industrys standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </>
  );
};

Home = withPageWrapper(Home);

export { Home };
