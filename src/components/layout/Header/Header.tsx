'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import {AppBarProps} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Image from 'next/image';
import styles from './header.module.scss';
import NextSVG from '../../../../public/next.svg';
import {styled} from '@mui/material/styles';
import {Link} from 'shared/ui';

const AppBarStyled = styled<typeof AppBar>(AppBar)<AppBarProps>(
    ({theme}) => ({
        margin: theme.spacing(0),
        padding: theme.spacing(0),
        '& .MuiIconButton-root': {
            margin: 0,
        },
    })
);

export const Header = () => {
    return (
        <>
            <AppBarStyled position="static" component={'header'}>
                <Toolbar>
                    <Link href="/" className={styles.logoLink}>
                        <NextSVG alt="Next" className={styles.logo}/>
                    </Link>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                        className={styles.slogan}
                    ></Typography>

                    <Link color="inherit" href={'/psychologists'} mx={1}>
                        Psychologists
                    </Link>
                </Toolbar>
            </AppBarStyled>
        </>
    );
};
