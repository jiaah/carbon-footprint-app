import React from 'react';


const SubmitResetButtons = ({ submitting, onReset }) => (

  <div className="flex justify-end pw1 submit-reset--btns">
    <button className="f-mini submit" type="submit">
            Submit
    </button>
    <button className="f-mini reset" type="button" disabled={submitting} onClick={onReset}>
            Reset
    </button>
  </div>
);

export default SubmitResetButtons;
