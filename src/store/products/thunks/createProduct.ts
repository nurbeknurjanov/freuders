import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProduct, IProductPost } from 'api/productsApi';

export const createProductThunk =
  (body: IProductPost): AppThunk<Promise<{ data: IProduct | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      products.createProduct.thunk.request({
        body,
      })
    );

    const { error, data } = products.createProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      data,
      error,
    };
  };
