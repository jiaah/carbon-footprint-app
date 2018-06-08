import React from 'react';
import { Field, reduxForm } from 'redux-form';


const number = value => ((value && (value <= 0)) ? 'Invalid passenger number' : undefined);

const renderField = ({
  input,
  label,
  type,
  text,
  meta: { error },
}) => {
  const inputError = (!error || (error === undefined)) ? null : 'input--error';

  return (
    <div className="form--button">
      <label>{label}</label>
      <div className="form--select-number">
        <input {...input} className={`form--border f-mini fw1 input btn--border form--select-number--input ${inputError}`} placeholder={text} type={type} />
      </div>
      { error && <span className="span--error">{error}</span> }
    </div>
  );
};

const NumberUpdownForm = ({ label, stateName }) => (

  <div>
    <Field
      name={stateName}
      type="number"
      component={renderField}
      label={label}
      validate={number}
      text="Select"
    />
  </div>
);

export default reduxForm({
  form: 'fieldLevelValidation',
})(NumberUpdownForm);
