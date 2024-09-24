import React from 'react';
import { Profile } from 'components/pages';
import type { PageProps } from 'app/types';

export default async function UserPage({
  params: _params,
  //searchParams,
}: PageProps) {
  return <Profile />;
}
