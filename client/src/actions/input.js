import * as actionTypes from './actionTypes';

export const addInputValue = (inputName, inputValue) => ({
  type: actionTypes.ADD_INPUT_VALUE,
  inputName,
  inputValue,
});

export const resetInputValue = () => ({
  type: actionTypes.RESET_INPUT_VALUE,
});

export const saveSearchResultValue = (isExist, inputId, departureV, destinationV) => (dispatch) => {
  if (isExist === -1) {
    dispatch({
      type: actionTypes.ADD_SEARCH_RESULT_VALUE,
      inputId,
      departureV,
      destinationV,
    });
  } else {
    dispatch({
      type: actionTypes.UPDATE_SEARCH_RESULT_VALUE,
      inputId,
      departureV,
      destinationV,
    });
  }
};

export const removeSearchResultValue = (inputId, inputName) => ({
  type: actionTypes.REMOVE_SEARCH_RESULT_VALUE,
  inputId,
  inputName,
});

export const resetSearchResultValue = () => ({
  type: actionTypes.RESET_SEARCH_RESULT_VALUE,
});
