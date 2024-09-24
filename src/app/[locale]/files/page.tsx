import React from 'react';
import type { PageProps } from 'app/types';
import { IPaginationRequest } from 'api/baseApi';
import { Files } from 'components/pages';

interface FilesPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest;
}
export default async function FilesPage({
  searchParams: _searchParams,
}: FilesPageProps) {
  return <Files />;
}
