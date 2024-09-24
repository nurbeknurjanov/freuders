import { AppThunk } from 'store/store';
import { common } from 'store';
import { notify, logout } from 'store/common/thunks';
import { CommonApiConfig, CommonApiError } from 'api/commonApi';

export const getAccessTokenThunk =
  ({
    config,
  }: {
    config: CommonApiConfig;
  }): AppThunk<
    Promise<{ data: string | null; error: CommonApiError | null }>
  > =>
  async (dispatch, getState) => {
    await dispatch(
      common.getAccessToken.thunk.request({
        config,
      })
    );

    const { error, data } = common.getAccessToken.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
      dispatch(logout());
    }

    return { data, error };
  };
