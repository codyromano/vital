import React from 'react';
import PropTypes from 'prop-types';
import './FormField.scss';

const FormField = ({
  label,
  options,
  optionComponent,
  optionComponentProps
}) => {
  const FieldOptionComponent = optionComponent;

  return (<fieldset>
      <legend>{label}</legend>
      {optionComponentProps.map((optionProps, index) => (
        <FieldOptionComponent key={index} {...optionProps} />
      ))}
  </fieldset>)
};

export default FormField;

export const fieldShape = PropTypes.shape({
  label: PropTypes.string,
  optionComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]).isRequired,
  optionComponentProps: PropTypes.array.isRequired
});
