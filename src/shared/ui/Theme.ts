'use client';
//import { Roboto } from "next/font/google";
import { createTheme } from '@mui/material/styles';
import { lime, red, grey } from '@mui/material/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { forwardRef, createElement } from 'react';

//type AnchorProps = React.HTMLProps<HTMLAnchorElement>;

const NextLinkRefWrapper = forwardRef<HTMLAnchorElement, NextLinkProps>(
  function LinkBehaviour(props, ref) {
    return createElement(NextLink, { ...props, ref });
  }
);

/*eslint-disable*/
declare module '@mui/material/styles' {
  //theme
  interface Theme {
    someVar: string;
  }

  interface ThemeOptions {
    someVar?: string;
  }

  //colors
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material' {
  interface TextFieldPropsColorOverrides {
    tertiary: true;
  }
}

/*const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});*/

const defaultTheme = createTheme();

const Theme = createTheme({
  //someVar: "red",
  //someVar: "secondary.main",
  shape: {
    borderRadius: 0,
  },
  breakpoints: {
    values: { ...defaultTheme.breakpoints.values, sm: 768 },
  },
  spacing: 8,
  palette: {
    mode: 'light',
    primary: defaultTheme.palette.augmentColor({
      color: {
        main: '#FF006B',
        contrastText: 'white',
      },
    }),
    //primary: orange,
    secondary: {
      main: grey[500],
      //main: "rgb(134, 255, 51)",
      contrastText: 'white',
    },
    /*tertiary: {
          main: lime[500],
          light: lime[700],
          dark: lime[300],
          contrastText: "rgba(0, 0, 0, 0.87)",
        },*/
    tertiary: defaultTheme.palette.augmentColor({
      color: {
        main: lime[500],
      },
    }),
  },
  typography: {
    //fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: red[700],
        },
        root: {
          marginBottom: '12px',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        maxRows: 5,
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 150,
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          display: 'block',
          margin: defaultTheme.spacing(0, 0, 2),
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: NextLinkRefWrapper,
      },
      styleOverrides: {
        root: {
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          //fontSize: "1rem",
        },
      },
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            border: `1px dashed ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `1px dashed ${defaultTheme.palette.secondary.main}`,
            color: defaultTheme.palette.secondary.main,
          },
        },
      ],
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme, ownerState: ownProps, ...mergedProps }) => {
          return {};
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme, ownerState: ownProps, ...mergedProps }) => {
          return {
            padding: theme.spacing(2),
            /*borderRadius: 0,*/
          };
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme, ownerState: ownProps, ...mergedProps }) => {
          return {
            padding: 0,
          };
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'elevation',
        elevation: 5,
      },
      styleOverrides: {
        root: ({ theme, ownerState: ownProps, ...mergedProps }) => {
          return {
            margin: theme.spacing(1, 0),
            padding: 0,
            '& .MuiCardContent-root:last-child': {
              padding: theme.spacing(2),
            },
          };
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiPopper: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiPaper-root': {
            padding: 0,
          },
          '& .MuiList-root': {
            //padding: 0,
          },
          '& .MuiListItemIcon-root': {
            minWidth: 30,
          },
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&+.MuiDialogContent-root': {
            paddingTop: `${theme.spacing(1)} !important`,
          },
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: theme.spacing(1),
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          alignItems: 'flex-start',
        },
        paper: ({ theme }) => {
          return {
            padding: 0,
            minWidth: 500,
            [theme.breakpoints.down('sm')]: {
              minWidth: `calc(100% - ${theme.spacing(4)})`,
            },
          };
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '2px 7px 2px 9px',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '2px 7px 2px 9px',
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          width: '100% !important',
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        disableColumnFilter: true,
        paginationMode: 'server',
        sortingMode: 'server',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          //marginTop: theme.spacing(1),
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          ' & .MuiInputBase-root': {
            width: 'auto',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(0, 3, 3, 3),
        }),
      },
    },
  },
});

export { Theme };

/*eslint-enable*/
