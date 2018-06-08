import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchFlights = (origin, destination) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_FLIGHTS_REQUEST,
  });
  axios.get('/api/flightaware', { origin, destination })
    .then(response => dispatch({
      type: actionTypes.FETCH_FLIGHTS_SUCCESS,
      payload: response.data.FindFlightResult.flights,
    }))
    .catch(error => dispatch({ type: actionTypes.FETCH_FLIGHTS_FAILURE, error }));
};

export default fetchFlights;
