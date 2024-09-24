'use client';
import { FC } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField, Typography } from '@mui/material';
import { Button } from 'shared/ui';
import styles from './login.module.scss';
import { withPageWrapper } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';
import { useLogin } from './useLogin';

let Login: FC = () => {
  const {
    register,
    handleSubmit,
    isValid,
    isDirty,
    errors,
    tCommon,
    tLoginPage,
    login,
    loginState,
  } = useLogin();

  useSetPageData(tLoginPage('title'), [tLoginPage('title')]);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <form className={styles.loginContent} onSubmit={handleSubmit(login)}>
          <TextField
            label={tLoginPage('fields.email')}
            error={!!errors['email']}
            helperText={errors['email']?.message}
            {...register('email')}
          />
          <TextField
            label={tLoginPage('fields.password')}
            error={!!errors['password']}
            helperText={errors['password']?.message}
            {...register('password')}
          />
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={loginState.isFetching}
            sx={{ minWidth: 120 }}
          >
            {tCommon('submit')}
          </Button>
        </form>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            {tLoginPage('fields.email')}: nurbek.nurjanov@mail.ru
            <br />
            {tLoginPage('fields.password')}: 123123
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Login = withPageWrapper(Login);

export { Login };
