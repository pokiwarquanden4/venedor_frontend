import { createActions as createCartActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const cartActions = createCartActions({
  createCartProductRequest: (payload) => payload,
  createCartProductSuccess: (payload) => payload,
  createCartProductFailure: (payload) => payload,

  getCartProductRequest: (payload) => payload,
  getCartProductSuccess: (payload) => payload,
  getCartProductFailure: (payload) => payload,

  deleteCartProductRequest: (payload) => payload,
  deleteCartProductSuccess: (payload) => payload,
  deleteCartProductFailure: (payload) => payload,

  editCartProductRequest: (payload) => payload,
  editCartProductSuccess: (payload) => payload,
  editCartProductFailure: (payload) => payload,

  setCartShowing: (payload) => payload,
});
