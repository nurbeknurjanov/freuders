'use client';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { withPageWrapper } from 'shared/hocs';

let Contact: FC = () => {
  const tContactPage = useTranslations('ContactPage');
  useSetPageData(tContactPage('title'), [tContactPage('title')]);

  return <>{tContactPage('description', { phone: '996558011477' })}</>;
};

Contact = withPageWrapper(Contact);

export { Contact };
