import { getType, staffActions } from '../../actions/account/StaffActions';
import { staffConstants } from '../../constants/accountContants/staffConstants';

export default function staffReducers(state = staffConstants, action) {
  switch (action.type) {
    case getType(staffActions.createStaffRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(staffActions.createStaffSuccess):
      return {
        ...state,
        success: true,
        staffList: action.payload.obj,
        loading: false,
      };
    case getType(staffActions.createStaffFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(staffActions.getStaffRequest):
      return {
        ...state,
        staffList: undefined,
        loading: true,
      };
    case getType(staffActions.getStaffSuccess):
      return {
        ...state,
        staffList: action.payload.obj,
        success: false,
        loading: false,
      };
    case getType(staffActions.getStaffFailure):
      return {
        ...state,
        staffList: undefined,
        success: false,
        loading: false,
      };
    case getType(staffActions.editStaffRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(staffActions.editStaffSuccess):
      return {
        ...state,
        success: true,
        staffList: action.payload.obj,
        loading: false,
      };
    case getType(staffActions.editStaffFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    case getType(staffActions.deleteStaffRequest):
      return {
        ...state,
        success: false,
        loading: true,
      };
    case getType(staffActions.deleteStaffSuccess):
      return {
        ...state,
        success: true,
        staffList: action.payload.obj,
        loading: false,
      };
    case getType(staffActions.deleteStaffFailure):
      return {
        ...state,
        success: false,
        loading: false,
      };
    default:
      return state;
  }
}
