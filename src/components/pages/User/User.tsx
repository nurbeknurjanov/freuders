'use client';
import React, { FC } from 'react';
import styles from './user.module.scss';
import { useUser } from './useUser';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withPageWrapper } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { useSetPageData, useTranslatedData } from 'shared/hooks';

const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Label',
    flex: 1,
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1,
  },
];

let User: FC = () => {
  const { tCommon, tUser, tUsersPage, model, getUserState } = useUser();
  const title = model?.name!;

  useSetPageData(title, [
    {
      label: tUsersPage('title'),
      href: '/users',
    },
    title,
  ]);

  const { statusOptions } = useTranslatedData();

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tCommon('id'),
      value: model._id,
    });
    rows.push({
      label: tUser('name'),
      value: model.name,
    });
    rows.push({
      label: tUser('email'),
      value: model.email,
    });
    rows.push({
      label: tUser('age'),
      value: model.age,
    });
    rows.push({
      label: tUser('status'),
      value: statusOptions[model.status],
    });
    rows.push({
      label: tCommon('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tCommon('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
    });
  }

  if (getUserState.isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.userContent}>
      <DataGrid
        columnHeaderHeight={0}
        hideFooter
        rows={rows}
        columns={columns}
        getRowId={el => el.label}
        paginationMode={'client'}
      />
    </div>
  );
};

User = withPageWrapper(User);

export { User };
