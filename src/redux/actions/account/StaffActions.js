import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const staffActions = createActions({
  createStaffRequest: (payload) => payload,
  createStaffSuccess: (payload) => payload,
  createStaffFailure: (payload) => payload,

  getStaffRequest: (payload) => payload,
  getStaffSuccess: (payload) => payload,
  getStaffFailure: (payload) => payload,

  editStaffRequest: (payload) => payload,
  editStaffSuccess: (payload) => payload,
  editStaffFailure: (payload) => payload,

  deleteStaffRequest: (payload) => payload,
  deleteStaffSuccess: (payload) => payload,
  deleteStaffFailure: (payload) => payload,
});
