import React from 'react';
import type { PageProps } from 'app/types';
import { IPaginationRequest } from 'api/baseApi';
import { Users } from 'components/pages';

interface UsersPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest;
}
export default async function UsersPage({
  searchParams: _searchParams,
}: UsersPageProps) {
  return <Users />;
}
