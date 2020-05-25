import actionTypes from '../actionTypes';

function setState(type, response) {
  return { type, response };
}

export function setUpdatedBills(payload) {
  return dispatch => {dispatch(setState(actionTypes.SET_ALL_BILLS, payload))};
}

export function getAllBills() {
  return dispatch => {dispatch(setState(actionTypes.GET_ALL_BILLS))};
}

export function resetFilters() {
  return dispatch => {dispatch(setState(actionTypes.RESET_ALL_FILTER))};
}

export function getDataForDropdown() {
  return dispatch => {dispatch(setState(actionTypes.GET_DROP_DOWN_DATA))};
}

