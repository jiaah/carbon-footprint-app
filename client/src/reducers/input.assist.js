import * as actionTypes from '../actions/actionTypes';


const initialState = {
  show: false,
  inputName: '',
  inputs: [1],
};

const inputAssist = (state = initialState, action) => {
  const { inputName } = action;
  const { inputs } = state;

  switch (action.type) {
    case actionTypes.TOGGLE_BOX: {
      return {
        ...state,
        show: !state.show,
      };
    }
    case actionTypes.ON_FOCUS_INPUT: {
      return {
        ...state,
        inputName,
      };
    }
    case actionTypes.ADD_INPUT_NUM: {
      return {
        ...state,
        inputs: inputs.concat([inputs.length + 1]),
      };
    }
    case actionTypes.RESET_INPUT_NUM: {
      return {
        ...state,
        inputs: [1],
      };
    }
    default:
      return state;
  }
};

export default inputAssist;
