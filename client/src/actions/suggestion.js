import * as actionTypes from './actionTypes';

export const saveSuggestions = matchArray => ({
  type: actionTypes.SAVE_SUGGESTIONS,
  matchArray,
});

export const resetSuggestions = () => ({
  type: actionTypes.RESET_SUGGESTIONS,
});
