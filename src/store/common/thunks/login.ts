import { AppThunk } from 'store/store';
import { common } from 'store';
import { notify, authorize } from 'store/common/thunks';
import { LoginRequestBodyParams, LoginResponse } from 'api/commonApi';
import { JWT } from 'shared/utils/jwt';

export const loginThunk =
  (
    body: LoginRequestBodyParams
  ): AppThunk<Promise<{ data: LoginResponse | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      common.login.thunk.request({
        body,
      })
    );

    const { error, data } = common.login.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    if (data) {
      const accessTokenParsed = await JWT.parseToken(data.accessToken);
      dispatch(authorize({ user: accessTokenParsed.user }));
    }
    return { data, error };
  };
