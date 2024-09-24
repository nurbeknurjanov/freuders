import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUserPost, IUser, IUserApiError } from 'api/usersApi';

export const profileChangePasswordThunk =
  (
    body: Pick<IUserPost, 'password'>
  ): AppThunk<Promise<{ data: IUser | null; error: IUserApiError | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.profileChangePassword.thunk.request({
        body,
      })
    );

    const { error, data } =
      users.profileChangePassword.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
