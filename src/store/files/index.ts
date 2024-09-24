import {
  getFilesObject,
  deleteFileObject,
  getFileObject,
  createFileObject,
} from './slices';

export const files = {
  getFiles: getFilesObject,
  deleteFile: deleteFileObject,
  getFile: getFileObject,
  createFile: createFileObject,
};
