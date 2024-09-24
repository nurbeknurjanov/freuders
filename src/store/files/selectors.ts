import { RootStateType } from 'store/store';
import { createSelector } from 'reselect';

export const getFilesStateSelector = (state: RootStateType) =>
  state.files.getFiles;

export const getFileStateSelector = (state: RootStateType) =>
  state.files.getFile;

export const getFileSelector = createSelector(
  getFileStateSelector,
  fileState => {
    return fileState.data;
  }
);
