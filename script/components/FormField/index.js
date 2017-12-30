import React from 'react';
import PropTypes from 'prop-types';
import './FormField.scss';

const FormField = ({
  label,
  options,
  optionComponent,
  optionComponentProps,
  onUpdateValue
}) => {
  const FieldOptionComponent = optionComponent;

  return (<fieldset className="form-field">
      <legend className="form-field-label">
        {label}
      </legend>
      {optionComponentProps.map((optionProps, index) => (
        <FieldOptionComponent
          key={index}
          {...optionProps}
          onUpdateValue={onUpdateValue}
        />
      ))}
  </fieldset>)
};

export default FormField;

export const fieldShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  optionComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]).isRequired,
  optionComponentProps: PropTypes.array.isRequired,
  // onUpdateValue: PropTypes.func.isRequired
});
