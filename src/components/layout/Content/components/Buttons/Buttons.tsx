import React from 'react';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import styles from './buttons.module.scss';

export const Buttons: React.FC = () => {
  const buttons = useAppSelector(common.buttonsContent.selector.state);
  if (!buttons) {
    return null;
  }

  return <div className={styles.buttons}>{buttons}</div>;
};
