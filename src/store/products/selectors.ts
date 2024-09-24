import { RootStateType } from 'store/store';
import { createSelector } from 'reselect';

export const getProductsStateSelector = (state: RootStateType) =>
  state.products.getProducts;

export const getProductStateSelector = (state: RootStateType) =>
  state.products.getProduct;

export const getProductSelector = createSelector(
  getProductStateSelector,
  productState => {
    return productState.data;
  }
);

export const getProductsPermissionsStateSelector = (state: RootStateType) =>
  state.products.productsPermissions;
