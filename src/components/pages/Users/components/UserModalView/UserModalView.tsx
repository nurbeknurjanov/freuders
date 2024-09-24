import React, { FC } from 'react';
import { useUserModel } from 'components/pages/User';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from 'next-intl';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { useTranslatedData } from 'shared/hooks';

export type IProps = {
  id: string;
  onClose: () => void;
};

const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Label',
    renderCell: params => params.value,
    flex: 1,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 1200,
    renderCell: params => {
      if (['background', 'icon_2', 'icon_3'].includes(params.row.label)) {
        return (
          <img src={params.value} width={300} style={{ margin: '20px 0' }} />
        );
      }

      if (['createdAt', 'updatedAt'].includes(params.row.label)) {
        return dayjs(params.value).format(DATE_FORMAT);
      }

      return params.value;
    },
    flex: 1,
  },
];

export const UserModalView: FC<IProps> = ({ onClose, id }) => {
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const tUser = useTranslations('User');
  const { model, getUserState } = useUserModel({
    id,
  });

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

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tUserPage('view')}</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>*/}

        {getUserState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
          <DataGrid
            columnHeaderHeight={0}
            hideFooter
            rows={rows}
            columns={columns}
            getRowId={el => el.label}
            paginationMode={'client'}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};
