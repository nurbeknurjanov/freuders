import React from 'react';
import { User } from 'components/pages';
import type { PageProps } from 'app/types';

export interface UserPageProps extends PageProps {
  params: PageProps['params'] & { id: string };
}

export default async function UserPage({
  params: _params,
  //searchParams,
}: UserPageProps) {
  return <User />;
}
