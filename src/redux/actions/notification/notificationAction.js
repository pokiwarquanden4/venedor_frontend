import { createActions as createNotificationActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const notificationActions = createNotificationActions({
  setNotificationShowing: (payload) => payload,
  setNotificationContent: (payload) => payload,
});
