import React /*, { ChangeEvent }*/ from 'react';
import { useProfileModalUpdate } from './useProfileModalUpdate';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material';
//import { Checkbox, FormGroup } from '@mui/material';
import { InputLabel, Select, MenuItem } from '@mui/material';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { useTranslatedData } from 'shared/hooks';

export type IProps = {
  onClose: () => void;
};

export const ProfileModalUpdate: React.FC<IProps> = ({ onClose }) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tProfilePage,
    tUser,
    aggStates,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  } = useProfileModalUpdate({
    onClose,
  });

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    ...sexRegisterOptions
  } = register('sex');

  /*const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue('sex', Number(event.target.value));
    } else {
      setValue('sex', null);
    }
  };*/

  const { sexOptions, statusOptions } = useTranslatedData();

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProfilePage('updateProfile')}</DialogTitle>
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
            label={tUser('name')}
            error={!!errors['name']}
            helperText={errors['name']?.message}
            {...register('name')}
          />

          <TextField
            label={tUser('email')}
            error={!!errors['email']}
            helperText={errors['email']?.message}
            {...register('email')}
          />

          <TextField
            label={tUser('age')}
            type="number"
            error={!!errors['age']}
            helperText={errors['age']?.message}
            {...register('age')}
          />

          <FormControl sx={{ mb: 3 }} error={!!errors['sex']}>
            <FormLabel>{tUser('sex')}</FormLabel>
            <RadioGroup
              value={watch('sex')}
              {...sexRegisterOptions}
              onChange={(e, value) => {
                setValue('sex', Number(value));
              }}
            >
              {Object.entries(sexOptions).map(([value, label]) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
            {!!errors['sex'] && (
              <FormHelperText>{errors['sex'].message}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <InputLabel>{tUser('status')}</InputLabel>
            <Select
              label={tUser('status')}
              {...register('status')}
              value={watch('status') ?? ''}
            >
              {Object.entries(statusOptions).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          loading={aggStates.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tCommon('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
