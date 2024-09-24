import {
  configureStore,
  Action,
  ThunkAction,
  //ThunkDispatch,
} from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const createStore = (initialState?: any) =>
  configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    //devTools: false,
    middleware: getDefaultMiddleware => {
      const defaultMiddleware = getDefaultMiddleware({
        //thunk: true,
        serializableCheck: false,
        //immutableCheck: false,
      });
      return defaultMiddleware;
    },
  });

export const serverStore = createStore();

export type RootStateType = ReturnType<typeof serverStore.getState>;
export type AppDispatchType = typeof serverStore.dispatch;
//export type AppDispatchType = ThunkDispatch<RootStateType, unknown, Action>;
export type AppThunk<ReturnData = void> = ThunkAction<
  ReturnData,
  RootStateType,
  unknown,
  Action<string>
>;

/*
 * useClient -он все обнуляет
 * без useClient - мы можем серверный инкремент делать, через каждое полное обновление браузера,
 * в браузере получать увеличенное значение
 * при этом селекторы мы не можем все равно использовать, по рукам бьет,selector, useEffect, useState, useRef, по всем
 *
 * а если включить useClient, тогда селекторы могут работать, но при этом они будут нулевые
 * serverStore.getState() тоже будет пустым, так как на клиенте он заново создается, да, так, проверил
 *
 * щас мы сделали гидрад
 * это значит есть два отдельных паралельных стора
 * это надо помнить и не забывать
 * просто второй когда создавался он получил изначальные готовые данные
 *
 * теперь на клиенте клиентский сторе будет мутировать, серверное будет не актуальным, но он в принципе нам то и не нужен
 * мы его использовали только как подготовка первоначальных данных, в клиент он падать не будет второй раз
 * потому что враппер работает только один раз
 *
 * но если мы перейдем на др страницу, серверный сторе будет мутировать титл, но на клиент передать не сможет
 * клиент сам должен повторно сам мутировать титл
 *
 * !!!!!
 * тоже самое и с др данными
 * если мы в первый раз зашли в игры, получили и передали, и возможно даже остановили клиент мутировать, типа не надо второй раз напрягатся за данными
 * они у нас есть
 *
 * !!!!
 * но если покинуть страницу, очистить данные, или изменить, оба означает мутацию клиентского сторе,
 * то это опять это означает неактуальность серверного стора
 * уйдем в др страницу и вернемся обратно, неактуальный серверный сторе ничего не сможет нам сделать и это хорошо
 * клиент сам должен заново себя обслуживать
 *
 * !!!!
 * А как клиента усыпить в первый раз, не надо,я это делал через ref and equal
 *
 * */
