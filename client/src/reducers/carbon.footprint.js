import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  carbon: '0.00',
};

const carbonFootprint = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CARBON_FOOTPRINT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_CARBON_FOOTPRINT_SUCCESS: {
      return {
        ...state,
        loading: false,
        carbon: action.payload,
      };
    }
    case actionTypes.FETCH_CARBON_FOOTPRINT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.RESET_CARBON_FOOTPRINT: {
      return {
        ...state,
        carbon: '0.00',
      };
    }
    default:
      return state;
  }
};

export default carbonFootprint;
