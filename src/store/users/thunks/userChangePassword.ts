import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUserPost, IUser } from 'api/usersApi';

export const userChangePasswordThunk =
  (
    id: string,
    body: Pick<IUserPost, 'password'>
  ): AppThunk<Promise<{ data: IUser | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.userChangePassword.thunk.request({
        id,
        body,
      })
    );

    const { error, data } = users.userChangePassword.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
