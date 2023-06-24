import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const messageActions = createActions({
  createRoomChatRequest: (payload) => payload,
  createRoomChatSuccess: (payload) => payload,
  createRoomChatFailure: (payload) => payload,

  getAllRoomChatRequest: (payload) => payload,
  getAllRoomChatSuccess: (payload) => payload,
  getAllRoomChatFailure: (payload) => payload,

  getMessageByRoomChatRequest: (payload) => payload,
  getMessageByRoomChatSuccess: (payload) => payload,
  getMessageByRoomChatFailure: (payload) => payload,
});
