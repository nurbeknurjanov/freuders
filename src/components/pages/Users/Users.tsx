'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from './users.module.scss';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { useUsers } from './useUsers';
import { Button, Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PasswordIcon from '@mui/icons-material/Password';
import {
  UserModalCreate,
  UserModalUpdate,
  UserModalView,
  UserModalDelete,
  UsersFilters,
  UserModalChangePassword,
} from './components';
import { withPageWrapper } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IUser } from 'api/usersApi';
import { useSetPageData, useTranslatedData } from 'shared/hooks';

let Users: FC = () => {
  const {
    tCommon,
    tUser,
    tUsersPage,
    tProfilePage,
    getUsersState,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  } = useUsers();

  useSetPageData(
    tUsersPage('title'),
    [tUsersPage('title')],
    <Button
      variant={'contained'}
      size={'small'}
      onClick={() => setShowModal({ type: 'create' })}
    >
      {tUsersPage('create')}
    </Button>
  );

  const { data, isFetching } = getUsersState;

  const { statusOptions } = useTranslatedData();

  const columns: GridColDef<IUser>[] = [
    {
      field: 'name',
      headerName: tUser('name'),
      renderCell: params => (
        <Link href={'/users/' + params.row._id}>{params.row.name}</Link>
      ),
      flex: 1,
    },
    {
      field: 'email',
      headerName: tUser('email'),
      flex: 1,
    },
    {
      field: 'status',
      headerName: tUser('status'),
      flex: 1,
      valueGetter: (params: GridValueGetterParams<IUser, IUser['status']>) =>
        statusOptions[params.value!],
    },
    {
      field: 'createdAt',
      headerName: tCommon('createdAt'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'updatedAt',
      headerName: tCommon('updatedAt'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'primary'} />}
          onClick={() => setShowModal({ type: 'view', id: params.row._id })}
          label={tCommon('view')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<EditIcon color={'warning'} />}
          onClick={() => setShowModal({ type: 'update', id: params.row._id })}
          label={tCommon('update')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'error'} />}
          onClick={() => setShowModal({ type: 'delete', id: params.row._id })}
          label={tCommon('delete')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<PasswordIcon />}
          onClick={() =>
            setShowModal({ type: 'changePassword', id: params.row._id })
          }
          label={tProfilePage('changePassword')}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      <div className={styles.usersContent}>
        <UsersFilters filters={filters} setFilters={setFilters} />

        <DataGrid
          sx={{ mt: 3 }}
          rows={data?.list ?? []}
          getRowId={el => el._id}
          columns={columns}
          loading={isFetching}
          paginationModel={{
            page: data?.pagination?.pageNumber ?? 0,
            pageSize: data?.pagination?.pageSize ?? 12,
          }}
          onPaginationModelChange={({ page, pageSize }) =>
            setPagination({ pageNumber: page, pageSize })
          }
          pageSizeOptions={[12, 24, 48]}
          rowCount={data?.pagination?.total || 0}
          onSortModelChange={setSorting}
          sortModel={sorting}
        />
      </div>

      {showModal?.type === 'create' && (
        <UserModalCreate onClose={closeShowModal} afterCreate={refreshList} />
      )}

      {showModal?.type === 'update' && (
        <UserModalUpdate
          id={showModal.id}
          onClose={closeShowModal}
          afterUpdate={refreshList}
        />
      )}

      {showModal?.type === 'delete' && (
        <UserModalDelete
          id={showModal.id}
          onClose={closeShowModal}
          afterDelete={refreshList}
        />
      )}

      {showModal?.type === 'view' && (
        <UserModalView id={showModal.id} onClose={closeShowModal} />
      )}

      {showModal?.type === 'changePassword' && (
        <UserModalChangePassword id={showModal.id} onClose={closeShowModal} />
      )}
    </>
  );
};

Users = withPageWrapper(Users);

export { Users };
