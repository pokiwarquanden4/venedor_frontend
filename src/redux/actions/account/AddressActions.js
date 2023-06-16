import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const addressActions = createActions({
  createAddressRequest: (payload) => payload,
  createAddressSuccess: (payload) => payload,
  createAddressFailure: (payload) => payload,

  getAddressRequest: (payload) => payload,
  getAddressSuccess: (payload) => payload,
  getAddressFailure: (payload) => payload,

  editAddressRequest: (payload) => payload,
  editAddressSuccess: (payload) => payload,
  editAddressFailure: (payload) => payload,

  deleteAddressRequest: (payload) => payload,
  deleteAddressSuccess: (payload) => payload,
  deleteAddressFailure: (payload) => payload,
});
