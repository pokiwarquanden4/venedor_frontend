import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const createAccountActions = createActions({
  createAccountRequest: (payload) => payload,
  createAccountSuccess: (payload) => payload,
  createAccountFailure: (payload) => payload,

  editAccountRequest: (payload) => payload,
  editAccountSuccess: (payload) => payload,
  editAccountFailure: (payload) => payload,

  setEditAccountWrongPassword: (payload) => payload,

  setAccountSuccessStatus: (payload) => payload,

  setAccountExist: (payload) => payload,

  setGmailExist: (payload) => payload,
});
