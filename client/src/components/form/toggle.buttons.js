import React from 'react';


const ToggleButtons = ({
  label1,
  label2,
  selectedTrip,
  selectedFlight,
  handleToggleTripButtonClick,
  handleToggleFlightButtonClick,
}) => {
  /* add 'btn--active'(color change) class on click */
  const onewayBtnActive = selectedTrip === 'roundTrip' ? '' : 'btn--active';
  const roundTripBtnActive = selectedTrip === 'roundTrip' ? 'btn--active' : '';
  const directBtnActive = selectedFlight === 'indirect' ? '' : 'btn--active';
  const indirectBtnActive = selectedFlight === 'indirect' ? 'btn--active' : '';

  return (
    <div className="flex justify-around pb2">
      <div className="form--button">
        <label>{label1}</label>
        <div className="flex pt2">
          <button
            type="button"
            className={`btn--border combined-btns combined-btns--left f-mini ${onewayBtnActive}`}
            onClick={ev => handleToggleTripButtonClick('oneway', ev)}
          >
          One-way
          </button>
          <button
            type="button"
            className={`btn--border combined-btns combined-btns--right f-mini ${roundTripBtnActive}`}
            onClick={ev => handleToggleTripButtonClick('roundTrip', ev)}
          >
          Round trip
          </button>
        </div>
      </div>
      <div className="form--button">
        <label>{label2}</label>
        <div className="flex pt2">
          <button
            type="button"
            className={`btn--border combined-btns combined-btns--left f-mini ${directBtnActive}`}
            onClick={ev => handleToggleFlightButtonClick('direct', ev)}
          >
          Direct
          </button>
          <button
            type="button"
            className={`btn--border combined-btns combined-btns--right f-mini ${indirectBtnActive}`}
            onClick={ev => handleToggleFlightButtonClick('indirect', ev)}
          >
          Indirect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleButtons;
