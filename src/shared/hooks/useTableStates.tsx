'use client';
import { useState, useRef, useCallback, useMemo } from 'react';
import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'navigation';
import { Dayjs } from 'dayjs';

export function useTableStates<TableFilters extends Record<string, any>>(
  fieldNamesForFilters: (keyof TableFilters)[],
  multipleFieldNames?: (keyof TableFilters)[],
  rangeFieldNames?: (keyof TableFilters)[],
  rangeFieldNamesSplit?: (keyof TableFilters)[]
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const pagination = useMemo<IPaginationRequest>(
    () => ({
      pageNumber: query.pageNumber ? Number(query.pageNumber) : 0,
      pageSize: query.pageSize ? Number(query.pageSize) : 12,
    }),
    [query.pageNumber, query.pageSize]
  );
  const setPagination = useCallback(
    (pagination: IPaginationRequest) => {
      if (pagination.pageNumber !== 0) {
        query.pageNumber = String(pagination.pageNumber);
      } else {
        delete query.pageNumber;
      }

      if (pagination.pageSize !== 12) {
        query.pageSize = String(pagination.pageSize);
      } else {
        delete query.pageSize;
      }

      router.push({ pathname, query }, { scroll: false });
    },
    [pathname, query, router]
  );
  const previousPagination = useRef<IPaginationRequest | null>(null);

  const sorting = useMemo<GridSortModel>(() => {
    if (!query.sortField) {
      return [];
    }

    return [
      {
        field: query.sortField as keyof TableFilters,
        sort: query.sortDirection ?? 'asc',
      },
    ] as GridSortModel;
  }, [query.sortField, query.sortDirection]);
  const setSorting = useCallback(
    (sorting: GridSortModel) => {
      if (sorting[0] && sorting[0].field) {
        query.sortField = sorting[0].field as keyof TableFilters as string;
      } else {
        delete query.sortField;
      }

      if (sorting[0] && sorting[0].sort === 'desc') {
        query.sortDirection = sorting[0].sort;
      } else {
        delete query.sortDirection;
      }

      router.push({ pathname, query }, { scroll: false });
    },
    [query, router, pathname]
  );
  const previousSorting = useRef<GridSortModel | null>(null);

  const filters = useMemo<TableFilters>(() => {
    const values = {} as TableFilters;
    fieldNamesForFilters.forEach(fieldName => {
      const queryKey = fieldName as string;
      let value:
        | string
        | string[]
        | null
        | [Dayjs | null, Dayjs | null]
        | { '0': number | ''; '1': number | '' } = searchParams.get(queryKey);

      if (multipleFieldNames?.includes(fieldName)) {
        value = searchParams.getAll(queryKey);
      }

      if (rangeFieldNames?.includes(fieldName)) {
        /*value = [
          searchParams.get(queryKey + 'From')
            ? dayjs(searchParams.get(queryKey + 'From') as string)
            : null,
          searchParams.get(queryKey + 'To')
            ? dayjs(searchParams.get(queryKey + 'To') as string)
            : null,
        ];*/
        value = {
          '0': searchParams.get(queryKey + 'From')
            ? Number(searchParams.get(queryKey + 'From'))
            : '',
          '1': searchParams.get(queryKey + 'To')
            ? Number(searchParams.get(queryKey + 'To'))
            : '',
        };
      }

      if (rangeFieldNamesSplit?.includes(fieldName)) {
        if (
          searchParams.get(queryKey + 'From') &&
          searchParams.get(queryKey + 'To')
        ) {
          value = `${searchParams.get(queryKey + 'From')}-${searchParams.get(queryKey + 'To')}`;
        }
      }

      if (value) {
        values[fieldName] = value as any;
      }
    });

    return values;
  }, [
    fieldNamesForFilters,
    multipleFieldNames,
    rangeFieldNames,
    searchParams,
    rangeFieldNamesSplit,
  ]);
  const setFilters = useCallback(
    (filters: TableFilters) => {
      fieldNamesForFilters.forEach(fieldName => {
        const queryKey = fieldName as string;

        const value = filters[fieldName];
        if (value) {
          if (rangeFieldNames?.includes(fieldName)) {
            if (value[0]) query[queryKey + 'From'] = value[0];
            //query[queryKey + 'From'] = dayjs(value[0]).toISOString();
            else {
              delete query[queryKey + 'From']; //reset
            }
            if (value[1]) query[queryKey + 'To'] = value[1];
            //query[queryKey + 'To'] = dayjs(value[1]).toISOString();
            else {
              delete query[queryKey + 'To']; //reset
            }
          } else if (rangeFieldNamesSplit?.includes(fieldName)) {
            const [from, to] = value.split('-');
            query[queryKey + 'From'] = from;
            query[queryKey + 'To'] = to;
          } else {
            query[queryKey] = value; //here sets string and array values
          }
        } else {
          delete query[queryKey]; //reset
          delete query[queryKey + 'From']; //reset
          delete query[queryKey + 'To']; //reset
        }
      });

      delete query.pageNumber;
      delete query.pageSize;
      delete query.sortField;
      delete query.sortDirection;
      router.push({ pathname, query }, { scroll: false });
    },
    [
      fieldNamesForFilters,
      rangeFieldNames,
      query,
      router,
      pathname,
      rangeFieldNamesSplit,
    ]
  );
  const previousFilters = useRef<TableFilters | null>(null);

  const [refreshListKey, setRefreshListKey] = useState<number>(Math.random());
  const previousRefreshListKey = useRef<number | null>(null);
  const refreshList = useCallback(() => setRefreshListKey(Math.random()), []);

  return {
    pagination,
    setPagination,
    previousPagination,
    sorting,
    setSorting,
    previousSorting,
    filters,
    setFilters,
    previousFilters,
    refreshListKey,
    refreshList,
    previousRefreshListKey,
  };
}
