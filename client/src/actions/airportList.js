import * as actionTypes from './actionTypes';

export const fetchAirportsList = airportCode => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_AIRPORTS_LIST_REQUEST,
  });

  // fetch()
  // .then(response => response.json())
  // .then(suggestion => {

  dispatch({
    type: actionTypes.FETCH_AIRPORTS_LIST_SUCCESS,
    payload: [
      {
        city: 'montreal', state: 'quebec', country: 'Canada', airport: 'YMX',
      },
      {
        city: 'montreal', state: 'quebec', country: 'Canada', airport: 'YUL',
      },
      {
        city: 'quebec', state: 'quebec', country: 'Canada', airport: 'CYQB',
      },
      {
        city: 'quebec', state: 'quebec', country: 'Canada', airport: 'YQB',
      },
      {
        city: 'Incheon', state: 'Seoul', country: 'South Korea', airport: 'ICN',
      },
    ],
  });
  // })
  // .catch( error => {

  //   dispatch({
  //     type: actionTypes.FETCH_AIRPORTS_LIST_FAILURE,
  //     error,
  //   })
  // })
};

export const resetAirportsList = () => ({
  type: actionTypes.RESET_AIRPORTS_LIST,
});
