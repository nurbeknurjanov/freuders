import React from 'react';
import { useFileModalDelete } from './useFileModalDelete';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IPropsBase {
  id: string;
  onClose: () => void;
}
export interface IProps extends IPropsBase {
  afterDelete: () => void;
}
interface IPropsCustom extends IPropsBase {
  customDeleteFile: (_id: string) => void;
}

export const FileModalDelete: React.FC<IProps | IPropsCustom> = ({
  id,
  onClose,
  ...props
}) => {
  const { tFilePage, tCommon, deleteFile, deleteFileState } =
    useFileModalDelete({
      onClose,
      afterDelete: 'afterDelete' in props ? props.afterDelete : () => {},
    });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tFilePage('delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tCommon('deleteAlert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            if ('customDeleteFile' in props && props.customDeleteFile) {
              return props.customDeleteFile(id);
            }

            deleteFile(id);
          }}
          autoFocus
          loading={deleteFileState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
