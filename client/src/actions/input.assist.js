import * as actionTypes from './actionTypes';

export const toggleBox = () => ({
  type: actionTypes.TOGGLE_BOX,
});

export const onFocusInput = inputName => ({
  type: actionTypes.ON_FOCUS_INPUT,
  inputName,
});

export const addInputNum = () => ({
  type: actionTypes.ADD_INPUT_NUM,
});

export const resetInputNum = () => ({
  type: actionTypes.RESET_INPUT_NUM,
});

