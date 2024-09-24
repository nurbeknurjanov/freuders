import {
  getProductsObject,
  deleteProductObject,
  updateProductObject,
  getProductObject,
  createProductObject,
  productsPermissions,
} from './slices';

export const products = {
  getProducts: getProductsObject,
  updateProduct: updateProductObject,
  deleteProduct: deleteProductObject,
  getProduct: getProductObject,
  createProduct: createProductObject,
  productsPermissions,
};
