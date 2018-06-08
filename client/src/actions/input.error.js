import * as actionTypes from './actionTypes';

export const addInputError = inputName => ({
  type: actionTypes.ADD_INPUT_ERROR,
  inputName,
});

export const updateInputError = () => ({
  type: actionTypes.UPDATE_INPUT_ERROR,
});

export const saveInputError = (inputError, inputName) => (dispatch) => {
  const matchInput = inputError.find(input => input === inputName);

  if (inputError.length === 0) {
    dispatch(addInputError(inputName));
  } else if (!matchInput) {
    dispatch(addInputError(inputName));
  } else {
    dispatch(updateInputError());
  }
};

export const removeInputError = inputName => ({
  type: actionTypes.REMOVE_INPUT_ERROR,
  inputName,
});

export const resetInputError = () => ({
  type: actionTypes.RESET_INPUT_ERROR,
});

