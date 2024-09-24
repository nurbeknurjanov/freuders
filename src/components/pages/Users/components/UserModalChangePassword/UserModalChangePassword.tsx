import React from 'react';
import { useUserModalChangePassword } from './useUserModalChangePassword';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

export type IProps = {
  id: string;
  onClose: () => void;
};

export const UserModalChangePassword: React.FC<IProps> = ({ onClose, id }) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tProfilePage,
    tUser,
    userChangePasswordState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  } = useUserModalChangePassword({
    id: id!,
    onClose,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProfilePage('changePassword')}</DialogTitle>
      <DialogContent>
        <form
          ref={el => {
            formRef.current = el!;
          }}
          /*ref={formRef}*/
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(submitForm)(e);
          }}
        >
          <TextField
            label={tUser('password')}
            error={!!errors['password']}
            helperText={errors['password']?.message}
            {...register('password')}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          disabled={!isDirty || !isValid}
          autoFocus
          loading={userChangePasswordState.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tCommon('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
