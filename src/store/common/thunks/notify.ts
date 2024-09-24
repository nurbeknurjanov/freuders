import { NotifyType } from '../slices';
import { common } from 'store';
//import { AppThunk } from 'store/store';

/*
export const notify = (
  text: NotifyType['text'], type: NotifyType['type']
): AppThunk =>
  async (dispatch) => {
    await dispatch(common.notify.actions.set({ text, type }));
  };*/
export const notify = (text: NotifyType['text'], type: NotifyType['type']) => {
  if (typeof text === 'string')
    return common.notify.actions.set({ text, type });

  return common.notify.actions.set({ text: 'Unknown error', type: 'error' });
};
