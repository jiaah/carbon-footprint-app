import React, { Component } from 'react';

/* -- Import Components -- */
import InputToggleBox from './input.toggle.box';


class InputForm extends Component {
    saveSearchResultAirportCode = (id, inputName, airportCode) => {
      const {
        onSaveSearchResultValue,
        searchResultValue,
        result,
      } = this.props;

      const isExist = result.length === 0 ? -1 : result.findIndex(r => r === id);
      const departure = isExist === -1 ? '' : searchResultValue[id].departure;
      const destination = isExist === -1 ? '' : searchResultValue[id].destination;

      if (inputName === `departure${id}`) {
        onSaveSearchResultValue(isExist, id, airportCode, destination);
      }
      if (inputName === `destination${id}`) {
        onSaveSearchResultValue(isExist, id, departure, airportCode);
      }
    }

    displaySearchResultValue = async (id, inputName, resultInput, airportCode, ev) => {
      const {
        show,
        onToggleBox,
        onAddInputValue,
        addInputRowOnFillingOutInputs,
      } = this.props;

      await ev.preventDefault();
      await this.saveSearchResultAirportCode(id, inputName, airportCode);
      await onAddInputValue(inputName, resultInput);
      if (show) {
        await onToggleBox();
      }

      return addInputRowOnFillingOutInputs(id);
    }

    render() {
      const {
        id,
        show,
        onFocusinputName,
        inputValue,
        suggestions,
        inputNum,
        inputError,
        handleInputChange,
        handleInputBlur,
        handleInputKeyUp,
        onToggleBox,
        handleInputClick,
        searchResultValue,
      } = this.props;

      const inactiveLabelStyle = ((inputNum.length > 1) && (id === inputNum[inputNum.length - 1])) ? 'xx-light-grey' : null;
      const inactiveInputStyle = ((inputNum.length > 1) && (id === inputNum[inputNum.length - 1])) ? 'xx-light-grey inactive--input-border' : null;
      const disabledInput = ((inputNum.length > 1) && (id === inputNum[inputNum.length - 1])) ? 1 : 0;

      const departureValue = (!inputValue || inputValue === '') ? '' :
        inputValue[`departure${id}`] ? inputValue[`departure${id}`] :
          '';
      const destinationValue = (!inputValue || inputValue === '') ? '' :
        inputValue[`destination${id}`] ? inputValue[`destination${id}`] :
          '';

      const depError = inputError.forEach(dep => ((dep === `departure${id}`) ? 'input--error' : null));
      const desError = inputError.forEach(des => ((des === `destination${id}`) ? 'input--error' : null));

      return (
        <div className="flex justify-between pw1 input--container-box">
          <label className={`pt3 mr2 input--label ${inactiveLabelStyle}`}>Trip {id}</label>
          <div className="flex-column-m">
            <input
              className={`form--border input input--text btn--border relative ${inactiveInputStyle} ${depError}`}
              name={`departure${id}`}
              value={departureValue}
              type="text"
              placeholder="location, airport name or IATA code ..."
              onClick={ev => handleInputClick(ev)}
              onChange={ev => handleInputChange(ev)}
              onBlur={ev => handleInputBlur(ev)}
              onKeyUp={ev => handleInputKeyUp(id, ev)}
              disabled={disabledInput}
            />
            <div>
              {
                                inputError.map(input =>
                                    (input === `departure${id}` ?
                                      <span key={id} className="span--error">please fill out this field.</span> :
                                            null))
                            }
            </div>
            {
                            ((!inputValue[`departure${id}`] || (inputValue[`departure${id}`] === '')) ||
                                (searchResultValue[id] && (searchResultValue[id].departure !== ''))) ? null :
                                    ((onFocusinputName === `departure${id}`) && show) ?
                                      <InputToggleBox
                                        suggestions={suggestions}
                                        inputValue={departureValue}
                                        inputName={`departure${id}`}
                                        inputId={id}
                                        show={show}
                                        handleSearchResultValue={this.displaySearchResultValue}
                                        onToggleBox={onToggleBox}
                                      /> : null
                        }
          </div>
          <div className="flex-column-m">
            <input
              className={`form--border input input--text btn--border ${inactiveInputStyle} ${desError}`}
              name={`destination${id}`}
              value={destinationValue}
              type="text"
              placeholder="location, airport name or IATA code ..."
              onClick={ev => handleInputClick(ev)}
              onChange={ev => handleInputChange(ev)}
              onBlur={ev => handleInputBlur(ev)}
              onKeyUp={ev => handleInputKeyUp(id, ev)}
              disabled={disabledInput}
            />
            <div>
              {
                                inputError.map(input =>
                                    (input === `destination${id}` ?
                                      <span key={id} className="span--error">please fill out the form</span> :
                                            null))
                            }
            </div>
            {
                            ((!inputValue[`destination${id}`] || (inputValue[`destination${id}`] === '')) ||
                                (searchResultValue[id] && (searchResultValue[id].destination !== ''))) ? null :
                                    ((onFocusinputName === `destination${id}`) && show) ?
                                      <InputToggleBox
                                        suggestions={suggestions}
                                        inputValue={destinationValue}
                                        inputName={`destination${id}`}
                                        inputId={id}
                                        show={show}
                                        handleSearchResultValue={this.displaySearchResultValue}
                                        onToggleBox={onToggleBox}
                                      /> : null
                        }
          </div>
        </div>
      );
    }
}

export default InputForm;
