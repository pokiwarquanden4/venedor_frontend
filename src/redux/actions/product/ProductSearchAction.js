import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const productSearchActions = createActions({
  searchProductRequest: (payload) => payload,
  searchProductSuccess: (payload) => payload,
  searchProductFailure: (payload) => payload,

  searchProductByIdRequest: (payload) => payload,
  searchProductByIdSuccess: (payload) => payload,
  searchProductByIdFailure: (payload) => payload,

  quickSearchProductRequest: (payload) => payload,
  quickSearchProductSuccess: (payload) => payload,
  quickSearchProductFailure: (payload) => payload,

  searchCategoryProductRequest: (payload) => payload,
  searchCategoryProductSuccess: (payload) => payload,
  searchCategoryProductFailure: (payload) => payload,
});
