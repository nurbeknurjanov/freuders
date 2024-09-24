import React from 'react';
import { useProductModalDelete } from './useProductModalDelete';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface IProps {
  id: string;
  onClose: () => void;
  afterDelete: () => void;
}
export const ProductModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  afterDelete,
}) => {
  const { tCommon, tProductPage, deleteProduct, deleteProductState } =
    useProductModalDelete({
      onClose,
      afterDelete,
    });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProductPage('delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tCommon('deleteAlert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteProduct(id);
          }}
          autoFocus
          loading={deleteProductState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
