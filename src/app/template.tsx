//'use client'; //если так сделать, тогда он будет работать постоянно на клиенте и постоянно обновляться будет
'use server';
import React, { PropsWithChildren } from 'react';
import { StoreProvider } from 'shared/wrappers';
import { serverStore } from 'store/store';
import { Content, Footer, Header } from 'components';
import { headers } from 'next/headers';
import styles from 'css/common.module.scss';
import { hydratedToClient } from 'store/common/thunks';
import { authorizeUser } from 'app/actions';

/*
Template works only on server side like a layout,
 But it works for every ajax request
 It mutate the server state
 But it never works on client side
 So it doesn't fluent to client state
*/
export default async function Template({ children }: PropsWithChildren) {
  const headersList = headers();

  try {
    await authorizeUser();
  } catch (error) {
    error;
  }

  if (serverStore.getState().common.hydrate.serverWait) {
    await new Promise(resolve => {
      setInterval(() => {
        if (serverStore.getState().common.hydrate.serverWait === false) {
          resolve(true);
        }
      }, 0);
    });
  }

  //console.log("header headersList.get('Referer')", headersList.get('Referer'));
  serverStore.dispatch(hydratedToClient(!!headersList.get('Referer')));

  return (
    <StoreProvider initialState={serverStore.getState()}>
      <Header />
      <main className={styles.main}>
        <Content>{children}</Content>
      </main>
      <Footer />
    </StoreProvider>
  );
}
