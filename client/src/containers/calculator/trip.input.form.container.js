import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

/* -- Import Components -- */
import Hr from '../../components/hr';
import Ul from '../../components/ul';

import InputForm from '../../components/form/input.form';

/* --- Actions --- */
import { toggleBox, onFocusInput } from '../../actions/input.assist';
import { fetchAirportsList } from '../../actions/airportList';
import { addInputValue, saveSearchResultValue, removeSearchResultValue } from '../../actions/input';
import { saveSuggestions } from '../../actions/suggestion';


class TripPathInputForm extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onBlurCloseToggleBox = this.onBlurCloseToggleBox.bind(this);
    this.removeSearchResultValue = this.removeSearchResultValue.bind(this);
  }

  onBlurCloseToggleBox = async (ev) => {
    const { show, onToggleBox } = this.props;

    await ev.preventDefault();
    if (show) onToggleBox();
  }

  getFocusInput = async (ev) => {
    const { name } = ev.target;

    await ev.preventDefault();
    // track user's input position -> used to open the input toggle box on the right input
    this.props.onFocusInput(name);
  };

  getFilteredAirportList = async (inputValue) => {
    const { onSaveSuggestions } = this.props;
    await this.props.onFetchAirportsList();
    const data = this.props.airportList;
    const matchArray = await this.findMatches(inputValue, data);
    return onSaveSuggestions(matchArray);
  }

  findMatches = (wordToMatch, data) => data.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex) || place.country.match(regex) || place.airport.match(regex);
  });


  handleInputChange = async (ev) => {
    const { name, value } = ev.target;
    const {
      onAddInputValue,
      inputError,
      onRemoveInputError,
      show,
      onToggleBox,
    } = this.props;

    await ev.preventDefault();
    if (inputError.length !== 0) {
      await inputError.forEach(input => (input === name ? onRemoveInputError(input) : null));
    }
    await onAddInputValue(name, value);
    await this.getFilteredAirportList(value);
    if (!show) onToggleBox();
  }

  removeSearchResultValue = async (id, ev) => {
    const {
      searchResultValue,
      onRemoveSearchResultValue,
      inputValue,
      onToggleBox,
      show,
    } = this.props;
    const { name, value } = ev.target;

    await ev.preventDefault();

    if (searchResultValue[id]) {
      if (((searchResultValue[id].departure !== '') && (inputValue[`departure${id}`] === '')) ||
            ((searchResultValue[id].destination !== '') && (inputValue[`destination${id}`] === ''))) {
        await onRemoveSearchResultValue(id, name);
      }
    }
    // prevent from toggle box not openning on re-research.
    if (value === '' && show) { onToggleBox(); }
  }

  addInputRowOnFillingOutInputs = async (id) => {
    const {
      searchResultValue,
      onAddInputNum,
      selectedFlight,
      inputNum,
    } = this.props;

    if ((selectedFlight === 'indirect') && searchResultValue[id] && (inputNum.length < 11)) {
      if ((searchResultValue[id].departure !== '') && (searchResultValue[id].destination !== '')) {
        // add an input row when only all the inputs are filled out except the last inactive one
        const isFilledOut = await inputNum
          .filter(input => input !== inputNum[inputNum.length - 1])
          .every(inputId =>
            (!!((searchResultValue[inputId] && (searchResultValue[inputId].departure !== '')) &&
            (searchResultValue[inputId] && (searchResultValue[inputId].destination !== '')))));

        if (isFilledOut) { onAddInputNum(); }
      }
    }
  }

  render() {
    const {
      inputNum,
      inputTitles,
      show,
      onFocusinputName,
      inputValue,
      suggestions,
      onToggleBox,
      onAddInputValue,
      onSaveSearchResultValue,
      searchResultValue,
      result,
      inputError,
    } = this.props;

    return (
      <div className="input--form">
        <div className="input--title">
          <Ul list={inputTitles} />
        </div>
        <Hr />
        { inputNum.map(inputId =>
          (<InputForm
            key={inputId}
            id={inputId}
            inputNum={inputNum}
            onFocusinputName={onFocusinputName}
            inputValue={inputValue}
            suggestions={suggestions}
            searchResultValue={searchResultValue}
            result={result}
            inputError={inputError}
            show={show}
            handleInputChange={this.handleInputChange}
            handleInputBlur={this.onBlurCloseToggleBox}
            handleInputClick={this.getFocusInput}
            handleInputKeyUp={this.removeSearchResultValue}
            onToggleBox={onToggleBox}
            onAddInputValue={onAddInputValue}
            onSaveSearchResultValue={onSaveSearchResultValue}
            addInputRowOnFillingOutInputs={this.addInputRowOnFillingOutInputs}

          />))}
        <Hr />
      </div>);
  }
}

const mapStateToProps = state => ({
  onFocusinputName: state.inputAssist.inputName,
  show: state.inputAssist.show,
  airportList: state.airportList.airportList,
  suggestions: state.suggestion.suggestions,
});

const mapDispatchToProps = dispatch => ({
  onToggleBox: () => dispatch(toggleBox()),
  onFocusInput: inputName => dispatch(onFocusInput(inputName)),
  onAddInputValue: (inputName, inputValue) => dispatch(addInputValue(inputName, inputValue)),
  onFetchAirportsList: airpoertCode => dispatch(fetchAirportsList(airpoertCode)),
  onSaveSearchResultValue: (isExist, inputId, departureV, destinationV) => dispatch(saveSearchResultValue(isExist, inputId, departureV, destinationV)),
  onRemoveSearchResultValue: (inputId, inputName) => dispatch(removeSearchResultValue(inputId, inputName)),
  onSaveSuggestions: matchArray => dispatch(saveSuggestions(matchArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripPathInputForm);
