import React from 'react';
import PropTypes from 'prop-types';
import './FormField.scss';
import { withModel } from 'vital-components/ModelProvider';

const FormField = ({
  id,
  label,
  options,
  optionComponent,
  optionComponentProps,
  updateModel,
  model
}) => {
  const FieldOptionComponent = optionComponent;

  return (<fieldset className="form-field">
      <legend className="form-field-label">
        {label}
      </legend>
      {optionComponentProps.map((optionProps, index) => (
        <FieldOptionComponent
          id={id}
          key={index}
          ownModelValue={model[id]}
          updateModel={updateModel}
          {...optionProps}
        />
      ))}
  </fieldset>)
};

export default withModel(FormField);

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
