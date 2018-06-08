import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  airportList: [],
};

const airportList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AIRPORTS_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_AIRPORTS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        airportList: action.payload,
      };
    }
    case actionTypes.FETCH_AIRPORTS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.RESET_AIRPORTS_LIST: {
      return {
        ...state,
        airportList: [],
      };
    }
    default:
      return state;
  }
};

export default airportList;
