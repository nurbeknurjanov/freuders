import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUser, IUserPost } from 'api/usersApi';

export const createUserThunk =
  (body: IUserPost): AppThunk<Promise<{ data: IUser | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.createUser.thunk.request({
        body,
      })
    );

    const { error, data } = users.createUser.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      data,
      error,
    };
  };
