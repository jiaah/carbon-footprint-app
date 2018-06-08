import React from 'react';
import { Field } from 'redux-form';


const SelectDropdownForm = ({ label, stateName, options }) => (

  <div className="pb1 form--button">
    <label>{label}</label>
    <div>
      <Field
        className="f-small form--select-dropdown fw1 btn--border"
        name={stateName}
        component="select"
      >
        <option>Select</option>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
              ))}
      </Field>
    </div>
  </div>
);

export default SelectDropdownForm;
