import * as actionTypes from '../actions/actionTypes';

const initialState = {
  selectedTrip: 'oneway',
  selectedFlight: 'direct',
};

const selectOptions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TRIP: {
      return {
        ...state,
        selectedTrip: action.selectedOption,
      };
    }
    case actionTypes.SELECT_FLIGHT: {
      return {
        ...state,
        selectedFlight: action.selectedOption,
      };
    }
    case actionTypes.RESET_OPTIONS: {
      return {
        ...state,
        selectedTrip: 'oneway',
        selectedFlight: 'direct',
      };
    }
    default:
      return state;
  }
};

export default selectOptions;
