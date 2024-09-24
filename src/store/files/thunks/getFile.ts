import { AppThunk } from 'store/store';
import { files } from 'store';
import { notify } from 'store/common/thunks';
import { IFile } from 'api/filesApi';

export const getFileThunk =
  (id: string): AppThunk<Promise<{ data: IFile | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      files.getFile.thunk.request({
        id,
      })
    );

    const { error, data } = files.getFile.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
