import { combineReducers } from '@reduxjs/toolkit';
import {
  getFilesObject,
  deleteFileObject,
  getFileObject,
  createFileObject,
} from './slices';

export const filesReducer = combineReducers({
  getFiles: getFilesObject.reducer,
  deleteFile: deleteFileObject.reducer,
  getFile: getFileObject.reducer,
  createFile: createFileObject.reducer,
});
