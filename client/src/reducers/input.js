import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  inputValue: {},
  result: [],
  searchResultValue: {},
};

const input = (state = initialState, action) => {
  const {
    inputName, inputValue, inputId, departureV, destinationV,
  } = action;
  const inputs = { id: inputId, departure: departureV, destination: destinationV };

  switch (action.type) {
    case actionTypes.ADD_INPUT_VALUE: {
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          [inputName]: inputValue,
        },
      };
    }
    case actionTypes.UPDATE_INPUT_VALUE: {
      return update(state, {
        inputValue: {
          [inputName]: { $set: '' },
        },
      });
    }
    case actionTypes.RESET_INPUT_VALUE: {
      return {
        ...state,
        inputValue: {},
      };
    }
    case actionTypes.ADD_SEARCH_RESULT_VALUE: {
      return {
        ...state,
        result: [
          ...state.result,
          inputId,
        ],
        searchResultValue: {
          ...state.searchResultValue,
          [inputId]: inputs,
        },
      };
    }
    case actionTypes.UPDATE_SEARCH_RESULT_VALUE: {
      return state.searchResultValue[inputId] ?
        {
          ...state,
          searchResultValue: {
            ...state.searchResultValue,
            [inputId]: inputs,
          },
        } : state;
    }
    case actionTypes.REMOVE_SEARCH_RESULT_VALUE: {
      return inputName === `departure${inputId}` ?
        update(state, {
          searchResultValue: {
            [inputId]: {
              departure: { $set: '' },
            },
          },
        }) : inputName === `destination${inputId}` ?
          update(state, {
            searchResultValue: {
              [inputId]: {
                destination: { $set: '' },
              },
            },
          }) :
          state;
    }
    case actionTypes.RESET_SEARCH_RESULT_VALUE: {
      return {
        ...state,
        result: [],
        searchResultValue: {},
      };
    }
    default:
      return state;
  }
};

export default input;
