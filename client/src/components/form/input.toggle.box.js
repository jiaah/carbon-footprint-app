import React from 'react';
import { Transition } from 'react-transition-group';


const InputToggleBox = ({
  show,
  suggestions,
  inputId,
  inputValue,
  inputName,
  handleSearchResultValue,
}) => {
  const duration = 400;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };

  const errorMessage = <div className="toggle-box--error"><span>No result...</span></div>;

  return (
    <Transition in={show} timeout={100}>
      { show => (
        <div
          style={{
          ...defaultStyle,
          ...transitionStyles[show],
          }}
          className="absolute dib bg-lightblue toggle-box"
        >
          {
            !suggestions || suggestions.length === 0 ? errorMessage :
              suggestions.map((place, index) => {
                const regex = new RegExp(inputValue, 'gi');
                /** BUG regex && span * */
                const cityName = place.city.replace(RegExp, `<span style={{color: red}}>${inputValue}</span>`);
                const stateName = place.state.replace(RegExp, `<span className="b">${inputValue}</span>`);
                const countryName = place.country.replace(RegExp, `<span className="b">${inputValue}</span>`);
                const airportCode = place.airport.replace(RegExp, `<span className="b">${inputValue}</span>`);

                const resultInput = `${airportCode}, ${cityName}, ${stateName}, ${countryName}`;

                return (
                  <button
                    key={index}
                    className="black bg-lightblue flex flex-column-m toggle-box--li"
                    /**
                      why not onClick ?
                      'click' event triggers after 'blur' -> make 'show === false' -> will not open the toggle box
                      -> click event will not be triggered
                    * */
                    onMouseDown={(ev) => {
                      handleSearchResultValue(inputId, inputName, resultInput, airportCode, ev);
                    }}
                  >
                    { resultInput }
                  </button>
                );
              })
          }
        </div>
      )}
    </Transition>
  );
};

export default InputToggleBox;
