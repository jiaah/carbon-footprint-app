import * as actionTypes from './actionTypes';

export const getCarbonFootprint = (
  selectedTrip,
  validPassengerNum,
  passengerClass,
  resultInputValue,
) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_CARBON_FOOTPRINT_REQUEST,
  });
  // axios.post('/api/flightaware', { selectedTrip, validPassengerNum, passengerClass, searchResultValue })
  // .then(suggestion => {

    dispatch({
      type: actionTypes.FETCH_CARBON_FOOTPRINT_SUCCESS,
      payload: 452.87,
    });
  // })
  // .catch( error => {

  //   dispatch({
  //     type: actionTypes.FETCH_CARBON_FOOTPRINT_FAILURE,
  //     error,
  //   })
  // })
};

export const resetCarbonFootprint = () => ({
  type: actionTypes.RESET_CARBON_FOOTPRINT,
});
