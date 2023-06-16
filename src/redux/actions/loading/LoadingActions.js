import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const loadingActions = createActions({
  setLoadingLoading: (payload) => payload,
});
