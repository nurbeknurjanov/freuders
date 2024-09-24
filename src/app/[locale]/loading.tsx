import React from 'react';
import styles from 'css/common.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className={styles.loadingPage}>
      <CircularProgress size={60} />
    </div>
  );
}
