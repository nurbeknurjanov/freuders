import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProductPost, IProduct } from 'api/productsApi';

export const updateProductThunk =
  (
    id: string,
    body: IProductPost
  ): AppThunk<Promise<{ data: IProduct | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      products.updateProduct.thunk.request({
        id,
        body,
      })
    );

    const { error, data } = products.updateProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
