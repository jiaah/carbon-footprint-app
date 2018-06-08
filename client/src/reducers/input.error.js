import * as actionTypes from '../actions/actionTypes';


const initialState = {
  inputError: [],
};

const inputError = (state = initialState, action) => {
  const { inputName } = action;

  switch (action.type) {
    case actionTypes.ADD_INPUT_ERROR: {
      return {
        ...state,
        inputError: [...state.inputError, inputName],
      };
    }
    case actionTypes.UPDATE_INPUT_ERROR: {
      return state;
    }
    case actionTypes.REMOVE_INPUT_ERROR: {
      return {
        ...state,
        inputError: state.inputError.filter(input => input !== inputName),
      };
    }
    case actionTypes.RESET_INPUT_ERROR: {
      return {
        ...state,
        inputError: [],
      };
    }
    default:
      return state;
  }
};

export default inputError;
