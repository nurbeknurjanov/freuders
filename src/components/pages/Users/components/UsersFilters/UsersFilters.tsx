import { useUsersFilters } from './useUsersFilters';
import {
  FormControl,
  /*InputLabel,
  MenuItem,
  Select,*/
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import { IUserFiltersForm, SEX_ENUM, STATUS_ENUM } from 'api/usersApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { isEqual } from 'lodash';
import Autocomplete from '@mui/material/Autocomplete';
//import { SelectChangeEvent } from '@mui/material/Select';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

export interface IProps {
  filters: IUserFiltersForm;
  setFilters: (_filters: IUserFiltersForm) => void;
}
export const UsersFilters = ({ filters, setFilters }: IProps) => {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');

  const {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    setValue,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
    statusOptions,
    sexOptions,
  } = useUsersFilters({ filters, setFilters });

  const autoCompleteOptions = Object.entries(statusOptions).map(
    ([value, label]) => ({ label, value: value as unknown as STATUS_ENUM })
  );
  register('status');

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              label={`${tCommon('from')} - ${tCommon('to')}`}
              slots={{ field: SingleInputDateRangeField }}
              value={watch('createdAt')}
              onChange={newValue =>
                setValue('createdAt', newValue, { shouldDirty: true })
              }
            />
          </LocalizationProvider>

          <TextField
            label={tUser('name')}
            {...register('name')}
            InputLabelProps={{ shrink: !!watch('name') }}
          />
          <TextField
            label={tUser('email')}
            {...register('email')}
            InputLabelProps={{ shrink: !!watch('email') }}
          />

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>{tUser('sex')}</FormLabel>
            <FormGroup
              {...register('sex')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const values = watch('sex') ?? [];
                if (event.target.checked) {
                  values.push(event.target.value as unknown as SEX_ENUM);
                } else {
                  const index = values.indexOf(
                    event.target.value as unknown as SEX_ENUM
                  );
                  values.splice(index, 1);
                }
                setValue('sex', values, { shouldDirty: true });
              }}
            >
              {Object.entries(sexOptions).map(([value, label]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={watch('sex')?.includes(
                        value as unknown as SEX_ENUM
                      )}
                      value={value}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/*<FormControl sx={{ mb: 2 }}>
            <InputLabel>{tUser('status')}</InputLabel>
            <Select
              label={tUser('status')}
              value={watch('status')}
              {...register('status')}
              multiple
            >
              {Object.entries(statusOptions).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>*/}
          <Autocomplete
            sx={{ mb: 2 }}
            multiple
            value={
              autoCompleteOptions.filter(el =>
                watch('status')?.includes(el.value)
              ) ?? []
            }
            onChange={(event, values) =>
              setValue('status', values?.map(el => el.value) ?? [], {
                shouldDirty: true,
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
              <TextField {...params} label={tUser('status')} />
            )}
          />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={
              getUsersState.isFetching &&
              !isEqual(filters, previousFilters.current)
            }
            sx={{ minWidth: 100 }}
          >
            {tCommon('search')}
          </Button>
          <Button type={'reset'} variant={'outlined'} sx={{ ml: 1 }}>
            {tCommon('reset')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
