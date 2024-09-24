import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUserApiError } from 'api/usersApi';

export const deleteUserThunk =
  (id: string): AppThunk<Promise<{ error: IUserApiError | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.deleteUser.thunk.request({
        id,
      })
    );

    const { error } = users.deleteUser.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      error,
    };
  };
