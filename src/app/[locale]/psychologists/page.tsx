import React from 'react';
import type { PageProps } from 'app/types';
import { IPaginationRequest } from 'api/baseApi';
import { Psychologists } from 'components/pages';

interface PsychologistsPageProps extends Omit<PageProps, 'searchParams'> {
  searchParams: IPaginationRequest;
}
export default async function PsychologistsPage({
  searchParams: _searchParams,
}: PsychologistsPageProps) {
  return <Psychologists />;
}
