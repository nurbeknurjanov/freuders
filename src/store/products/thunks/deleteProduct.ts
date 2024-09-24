import { AppThunk } from 'store/store';
import { products } from 'store';
import { notify } from 'store/common/thunks';
import { IProductApiError } from 'api/productsApi';

export const deleteProductThunk =
  (id: string): AppThunk<Promise<{ error: IProductApiError | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      products.deleteProduct.thunk.request({
        id,
      })
    );

    const { error } = products.deleteProduct.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return {
      error,
    };
  };
