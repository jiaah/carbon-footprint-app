import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  flights: [],
};

const flightaware = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FLIGHTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_FLIGHTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        flights: action.payload,
      };
    }
    case actionTypes.FETCH_FLIGHTS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default flightaware;
