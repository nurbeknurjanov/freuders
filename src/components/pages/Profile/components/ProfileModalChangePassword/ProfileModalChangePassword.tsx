import React from 'react';
import { useProfileModalChangePassword } from './useProfileModalChangePassword';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

export type IProps = {
  onClose: () => void;
};

export const ProfileModalChangePassword: React.FC<IProps> = ({ onClose }) => {
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
  } = useProfileModalChangePassword({
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
            label={tUser('currentPassword')}
            error={!!errors['currentPassword']}
            helperText={errors['currentPassword']?.message}
            {...register('currentPassword')}
          />

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
          {tCommon('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
