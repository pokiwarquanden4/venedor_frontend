import { createAccountActions, getType } from '../../actions/account/CreateAccountActions';
import { createAccountConstant } from '../../constants/accountContants/CreateAccountConstants';

export default function createAccountReducers(state = createAccountConstant, action) {
  switch (action.type) {
    case getType(createAccountActions.createAccountRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(createAccountActions.createAccountSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(createAccountActions.createAccountFailure):
      return {
        ...state,
        success: false,
        loading: false,
        accountExist: action.payload.name === 'SequelizeUniqueConstraintError' ? true : false,
        gmailExist: action.payload === "Email doesn't exist" ? true : false,
      };
    case getType(createAccountActions.setAccountSuccessStatus):
      return {
        ...state,
        success: action.payload,
      };
    case getType(createAccountActions.setAccountExist):
      return {
        ...state,
        accountExist: action.payload,
      };
    case getType(createAccountActions.setGmailExist):
      return {
        ...state,
        gmailExist: action.payload,
      };
    case getType(createAccountActions.editAccountRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(createAccountActions.editAccountSuccess):
      return {
        ...state,
        success: true,
        loading: false,
      };
    case getType(createAccountActions.editAccountFailure):
      return {
        ...state,
        success: false,
        loading: false,
        wrongPassword: action.payload === 'Wrong Password' ? true : false,
      };
    case getType(createAccountActions.setEditAccountWrongPassword):
      return {
        ...state,
        wrongPassword: action.payload,
      };
    default:
      return state;
  }
}
