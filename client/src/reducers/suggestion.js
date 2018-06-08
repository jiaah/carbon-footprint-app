import * as actionTypes from '../actions/actionTypes';


const initialState = {
  suggestions: [],
};

const suggestion = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SUGGESTIONS: {
      return {
        ...state,
        suggestions: action.matchArray,
      };
    }
    case actionTypes.RESET_SUGGESTIONS: {
      return {
        ...state,
        suggestions: [],
      };
    }
    default:
      return state;
  }
};

export default suggestion;
