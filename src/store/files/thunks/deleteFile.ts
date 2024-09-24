import { AppThunk } from 'store/store';
import { files } from 'store';
import { notify } from 'store/common/thunks';
import { IFileApiError, IFile } from 'api/filesApi';

export const deleteFileThunk =
  (
    id: string
  ): AppThunk<Promise<{ error: IFileApiError | null; data: IFile | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      files.deleteFile.thunk.request({
        id,
      })
    );

    const { error, data } = files.deleteFile.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      error,
      data,
    };
  };
