import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/* ---- Import Other Reducers ---- */
import selectOptions from './select.options';
import airportList from './airportList';
import inputAssist from './input.assist';
import input from './input';
import flightaware from './flightaware';
import carbonFootprint from './carbon.footprint';
import inputError from './input.error';
import suggestion from './suggestion';


export default combineReducers({
  input,
  inputAssist,
  inputError,
  airportList,
  suggestion,
  selectOptions,
  flightaware,
  carbonFootprint,
  form: formReducer,
  routing: routerReducer,
});
