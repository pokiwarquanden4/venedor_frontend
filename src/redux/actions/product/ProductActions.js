import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const productActions = createActions({
  getCategoryRequest: (payload) => payload,
  getCategorySuccess: (payload) => payload,
  getCategoryFailure: (payload) => payload,

  createProductRequest: (payload) => payload,
  createProductSuccess: (payload) => payload,
  createProductFailure: (payload) => payload,

  setProductSuccess: (payload) => payload,

  getSellerProductRequest: (payload) => payload,
  getSellerProductSuccess: (payload) => payload,
  getSellerProductFailure: (payload) => payload,

  editProductRequest: (payload) => payload,
  editProductSuccess: (payload) => payload,
  editProductFailure: (payload) => payload,

  getCommentRequest: (payload) => payload,
  getCommentSuccess: (payload) => payload,
  getCommentFailure: (payload) => payload,
});
