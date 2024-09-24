import { TitleType } from '../slices';
import { common } from 'store';

export const setTitle = (
  title: TitleType['title'],
  description?: TitleType['description']
) => common.title.actions.set({ title, description });
