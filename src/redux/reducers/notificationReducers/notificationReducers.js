import { getType, notificationActions } from '../../actions/notification/notificationAction';
import { notificationConstants } from '../../constants/notificationConstant/notificationConstant';

export default function notificationReducers(state = notificationConstants, action) {
  switch (action.type) {
    case getType(notificationActions.setNotificationShowing):
      return {
        ...state,
        showing: action.payload,
      };
    case getType(notificationActions.setNotificationContent):
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
}
