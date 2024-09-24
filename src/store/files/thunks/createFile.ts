import { AppThunk } from 'store/store';
import { files } from 'store';
import { notify } from 'store/common/thunks';
import { IFile, IFileApiConfig, IFilePost } from 'api/filesApi';

export const createFileThunk =
  (
    body: IFilePost,
    config?: IFileApiConfig
  ): AppThunk<Promise<{ data: IFile | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      files.createFile.thunk.request({
        body,
        config,
      })
    );

    const { error, data } = files.createFile.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      data,
      error,
    };
  };
