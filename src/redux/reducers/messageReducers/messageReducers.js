import { getType, messageActions } from '../../actions/message/messageActions';
import { messageConstants } from '../../constants/messageConstant.js/messageConstant';

export default function messageReducers(state = messageConstants, action) {
  switch (action.type) {
    case getType(messageActions.createRoomChatRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(messageActions.createRoomChatSuccess):
      return {
        ...state,
        loading: false,
      };
    case getType(messageActions.createRoomChatFailure):
      return {
        ...state,
        loading: false,
      };
    case getType(messageActions.getAllRoomChatRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(messageActions.getAllRoomChatSuccess):
      return {
        ...state,
        loading: false,
        listRoom: action.payload.obj,
      };
    case getType(messageActions.getAllRoomChatFailure):
      return {
        ...state,
        loading: false,
      };
    case getType(messageActions.getMessageByRoomChatRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(messageActions.getMessageByRoomChatSuccess):
      return {
        ...state,
        loading: false,
        messages: action.payload.obj,
      };
    case getType(messageActions.getMessageByRoomChatFailure):
      return {
        ...state,
        loading: false,
      };
    case getType(messageActions.createChatbotRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(messageActions.createChatbotSuccess):
      return {
        ...state,
        loading: false,
        chatbotMessages: action.payload.obj,
      };
    case getType(messageActions.createChatbotFailure):
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
