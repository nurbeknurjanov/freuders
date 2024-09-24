'use client';
import { default as MuiCheckbox } from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

declare module '@mui/material' {
  //eslint-disable-next-line
  interface CheckboxPropsColorOverrides {
    tertiary: true;
  }
}
export const Checkbox = styled(MuiCheckbox)(({ theme: _theme, ...props }) => {
  if (!props.color)
    return {
      //color: theme.someVar,
      '&.Mui-checked': {
        //color: theme.someVar,
      },
    };
});
