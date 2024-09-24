import React /*, { ChangeEvent }*/ from 'react';
import { useUserModalUpdate } from './useUserModalUpdate';
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
//import { InputLabel, Select, MenuItem } from '@mui/material';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslatedData } from 'shared/hooks';
import { omit } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';

export type IProps = {
  id: string;
  onClose: () => void;
  afterUpdate: () => void;
};

export const UserModalUpdate: React.FC<IProps> = ({
  onClose,
  afterUpdate,
  id,
}) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tUserPage,
    tUser,
    aggStates,
    getUserState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  } = useUserModalUpdate({
    id: id!,
    onClose,
    afterUpdate,
  });

  /*const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue('sex', Number(event.target.value));
    } else {
      setValue('sex', null);
    }
  };*/

  const { sexOptions, statusOptions } = useTranslatedData();

  const autoCompleteOptions = Object.entries(statusOptions).map(
    ([value, label]) => ({ label, value })
  );
  register('status');

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tUserPage('update')}</DialogTitle>
      <DialogContent>
        {getUserState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
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
                {...omit(register('sex'), 'onBlur')}
                onChange={(e, value) => {
                  setValue('sex', Number(value), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
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

            {/*<FormControl sx={{ mb: 2 }} error={!!errors['status']}>
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
              {!!errors['status'] && (
                <FormHelperText>{errors['status'].message}</FormHelperText>
              )}
            </FormControl>*/}

            <Autocomplete
              sx={{ mb: 2 }}
              value={
                autoCompleteOptions.find(
                  el => el.value === String(watch('status'))
                ) ?? null
              }
              onChange={(event, value) =>
                setValue('status', value!?.value ?? null, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              options={autoCompleteOptions}
              /*renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}*/
              getOptionLabel={option => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={params => (
                <TextField
                  {...params}
                  label={tUser('status')}
                  error={!!errors['status']}
                  helperText={errors['status']?.message}
                />
              )}
            />
          </form>
        )}
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
          {tCommon('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
