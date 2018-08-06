import React, { Component } from 'react';
import { reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

/* -- Import Components -- */
import * as data from '../../components/data';
import Header from '../../components/header';
import ToggleButtons from '../../components/form/toggle.buttons';
import SelectDropdownForm from '../../components/form/select.dropdown.form';
import NumberUpdownForm from '../../components/form/number.updown.form';
import TripInputForm from './trip.input.form.container';
import Footprint from '../../components/footprint';
import SubmitResetButtons from '../../components/submit.reset.buttons';

/* --- Actions --- */
import { selectTrip, selectFlight, resetOptions } from '../../actions/select.options';
import { addInputNum, resetInputNum } from '../../actions/input.assist';
import { resetInputValue, resetSearchResultValue } from '../../actions/input';
import { saveInputError, removeInputError, resetInputError } from '../../actions/input.error';
import { getCarbonFootprint, resetCarbonFootprint } from '../../actions/carbon.footprint';
import { fetchFlights } from '../../actions/flightaware';


class FlightCalculator extends Component {
  constructor() {
    super();
    this.handleToggleTripButtonClick = this.handleToggleTripButtonClick.bind(this);
    this.handleToggleFlightButtonClick = this.handleToggleFlightButtonClick.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  componentDidMount = () => {
    // keep scroll position
    const cookies = new Cookies();
    if (cookies.get('currentYOffset') !== undefined) {
      const jumpTo = cookies.get('currentYOffset');
      window.scrollTo(0, jumpTo);
      cookies.remove('currentYOffset');
    }
  }

  onReset = () => {
    const {
      onResetOptions,
      reset,
      onResetInputNum,
      onResetInputValue,
      onResetSearchResultValue,
      onResetInputError,
      onResetCarbonFootprint,
    } = this.props;

    onResetOptions();
    reset();
    onResetInputNum();
    onResetInputValue();
    onResetSearchResultValue();
    onResetInputError();
    onResetCarbonFootprint();
  };

  handleToggleTripButtonClick = async (selectedOption, ev) => {
    ev.preventDefault();
    if (selectedOption !== this.props.selectedTrip) { await this.props.onSelectTrip(selectedOption); }
  };

  handleToggleFlightButtonClick = async (selectedOption, ev) => {
    const {
      onSelectFlight,
      onAddInputNum,
      onResetInputNum,
      inputNum,
    } = this.props;
    const initInputArray = [1, 2];
    ev.preventDefault();
    if (selectedOption !== this.props.selectedFlight) { await onSelectFlight(selectedOption); }
    // on click 'indirect', if only Trip 1 exist, add 2 input rows ( active one && disabled one )
    if ((selectedOption === 'indirect') && (inputNum.length === 1)) { initInputArray.forEach(i => onAddInputNum()); }
    if (selectedOption === 'direct') { onResetInputNum(); }
  };

  handleError = (id) => {
    const { inputError, searchResultValue, onSaveInputError } = this.props;

    if ((!searchResultValue[id]) || (searchResultValue[id].departure === '')) { onSaveInputError(inputError, `departure${id}`); }
    if ((!searchResultValue[id]) || (searchResultValue[id].destination === '')) { onSaveInputError(inputError, `destination${id}`); }
  }

  verificationValues = (passengerNumber) => {
    const {
      result,
      inputNum,
      onSaveInputError,
      inputError,
      selectedFlight,
      inputValue,
    } = this.props;

    // result is 'array of search result value's ids'
    if (!result || result.length === 0) {
      const inputs = selectedFlight === 'direct' ? inputNum :
        inputNum.filter(id => id !== inputNum[inputNum.length - 1]);

      // throw errors to all inputs except last disabled input row
      inputs.forEach((id) => {
        onSaveInputError(inputError, `departure${id}`);
        onSaveInputError(inputError, `destination${id}`);
      });
    } else {
      const inputs = selectedFlight === 'direct' ? inputNum :
        inputNum.filter(id =>
          ((id !== inputNum[inputNum.length - 2]) && (id !== inputNum[inputNum.length - 1])));
      const lastActiveInput = inputNum[inputNum.length - 2];

      // check all inputs except last 2 input rows (last active one && disabled one)
      inputs.forEach((id) => {
        this.handleError(id);
      });

      // check last active input row
      // if ( last active input === Trip 2 ) Inputs must be filled out
      if ((selectedFlight === 'indirect') && (lastActiveInput === 2)) {
        this.handleError(lastActiveInput);
      } else if (lastActiveInput > 2) {
        // both Input Value === '' ? null : check error
        if (((!inputValue[`departure${lastActiveInput}`]) || (inputValue[`departure${lastActiveInput}`] === '')) &&
          ((!inputValue[`destination${lastActiveInput}`]) || (inputValue[`destination${lastActiveInput}`] === ''))) {
          // do nothing
        } else {
          this.handleError(lastActiveInput);
        }
      }
    }

    const validPassengerNum = (!passengerNumber || (passengerNumber > 0)) ? 1 : 0;
    return validPassengerNum;
  };

  fetchFlightsFootPrint = (validPassengerNum) => {
    const {
      inputError,
      selectedTrip,
      searchResultValue,
      onGetCarbonFootprint,
    } = this.props;
    const { passengerClass } = this.props.formValueA ? this.props.formValueA : '';

    if ((inputError.length === 0) && validPassengerNum) {
      onGetCarbonFootprint(
        selectedTrip,
        validPassengerNum,
        passengerClass,
        searchResultValue,
      );
    }
  }

  submit = async (ev) => {
    await ev.preventDefault();

    // save Y position
    const cookies = new Cookies();
    cookies.set('currentYOffset', window.pageYOffset);

    const { formValueB, onResetCarbonFootprint } = this.props;
    const { passengerNumber } = formValueB || '';
    const validPassengerNum = await this.verificationValues(passengerNumber);

    await onResetCarbonFootprint();
    return this.fetchFlightsFootPrint(validPassengerNum);
  };

  render() {
    const {
      submitting,
      selectedTrip,
      selectedFlight,
      searchResultValue,
      result,
      inputValue,
      inputNum,
      onAddInputNum,
      inputError,
      onRemoveInputError,
      carbonFootprint,
    } = this.props;

    const position = { y: window.pageYOffset };
    localStorage.setItem('position', JSON.stringify(position));

    return (

      <div id="formPosition" className="bg-grey h-100">
        <Header
          contents1="Travel"
          contents2="Environmentally"
          contents3="Friendly"
        />
        <div className="container-raised bg-darkwhite">
          <div className="container-raised--box">
            <h2 className="pa1 tc lh-1 ls-1 fw3 ttu">Carbon Calculator</h2>
            <div className="container-raised--form">
              <form action="" onSubmit={(ev) => { this.submit(ev); return false; }}>
                <div className="flex flex-column-m form--buttons">
                  <ToggleButtons
                    label1="Trip*"
                    label2="Flight*"
                    selectedTrip={selectedTrip}
                    selectedFlight={selectedFlight}
                    handleToggleTripButtonClick={this.handleToggleTripButtonClick}
                    handleToggleFlightButtonClick={this.handleToggleFlightButtonClick}
                  />
                  <div className="flex justify-around flex-auto pt3 form--buttons-passenger">
                    <NumberUpdownForm
                      label="Passenger Number"
                      stateName="passengerNumber"
                    />
                    <SelectDropdownForm
                      options={data.passengerClassOption}
                      label="Passenger Class"
                      stateName="passengerClass"
                    />
                  </div>
                </div>
                <div className="pt5">
                  <TripInputForm
                    inputTitles={data.tripPathForm}
                    selectedFlight={selectedFlight}
                    inputNum={inputNum}
                    searchResultValue={searchResultValue}
                    result={result}
                    inputError={inputError}
                    onAddInputNum={onAddInputNum}
                    onRemoveInputError={onRemoveInputError}
                    inputValue={inputValue}
                  />
                </div>
                <SubmitResetButtons
                  submitting={submitting}
                  onReset={this.onReset}
                />
              </form>
              <Footprint
                transportation="Flight"
                carbonFootprint={carbonFootprint}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTrip: state.selectOptions.selectedTrip,
  selectedFlight: state.selectOptions.selectedFlight,
  inputNum: state.inputAssist.inputs,
  inputValue: state.input.inputValue,
  flights: state.flightaware.flights,
  searchResultValue: state.input.searchResultValue,
  result: state.input.result,
  inputError: state.inputError.inputError,
  carbonFootprint: state.carbonFootprint.carbon,
  formValueA: getFormValues('flightReduxform')(state),
  formValueB: getFormValues('fieldLevelValidation')(state),
});

const mapDispatchToProps = dispatch => ({
  onSelectTrip: selectedOption => dispatch(selectTrip(selectedOption)),
  onSelectFlight: selectedOption => dispatch(selectFlight(selectedOption)),
  onResetOptions: () => dispatch(resetOptions()),
  onAddInputNum: () => dispatch(addInputNum()),
  onResetInputNum: () => dispatch(resetInputNum()),
  onFetchFlights: (origin, destination) => dispatch(fetchFlights(origin, destination)),
  onResetInputValue: () => dispatch(resetInputValue()),
  onResetSearchResultValue: () => dispatch(resetSearchResultValue()),
  onSaveInputError: (inputError, inputName) => dispatch(saveInputError(inputError, inputName)),
  onRemoveInputError: inputName => dispatch(removeInputError(inputName)),
  onResetInputError: () => dispatch(resetInputError()),
  onGetCarbonFootprint: (selectedTrip, validPassengerNum, passengerClass, searchResultValue) => dispatch(getCarbonFootprint(selectedTrip, validPassengerNum, passengerClass, searchResultValue)),
  onResetCarbonFootprint: () => dispatch(resetCarbonFootprint()),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'flightReduxform',
})(FlightCalculator));
