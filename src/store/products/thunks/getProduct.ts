import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProduct } from 'api/productsApi';

export const getProductThunk =
  (id: string): AppThunk<Promise<{ data: IProduct | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      products.getProduct.thunk.request({
        id,
      })
    );

    const { error, data } = products.getProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
