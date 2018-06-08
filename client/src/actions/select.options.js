import * as actionTypes from './actionTypes';

export const selectTrip = selectedOption => ({
  type: actionTypes.SELECT_TRIP,
  selectedOption,
});

export const selectFlight = selectedOption => ({
  type: actionTypes.SELECT_FLIGHT,
  selectedOption,
});

export const selectDeparture = selectedOption => ({
  type: actionTypes.SELECT_DEPARTURE,
  selectedOption,
});

export const selectDestination = selectedOption => ({
  type: actionTypes.SELECT_DESTINATION,
  selectedOption,
});

export const resetOptions = () => ({
  type: actionTypes.RESET_OPTIONS,
});

