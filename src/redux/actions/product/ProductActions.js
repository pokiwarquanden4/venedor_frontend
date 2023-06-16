import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const productActions = createActions({
  createProductRequest: (payload) => payload,
  createProductSuccess: (payload) => payload,
  createProductFailure: (payload) => payload,

  setProductSuccess: (payload) => payload,

  getAllProductRequest: (payload) => payload,
  getAllProductSuccess: (payload) => payload,
  getAllProductFailure: (payload) => payload,

  editProductRequest: (payload) => payload,
  editProductSuccess: (payload) => payload,
  editProductFailure: (payload) => payload,
});
