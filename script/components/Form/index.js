import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'vital-components/ActionButton';
import FormField, { fieldShape } from 'vital-components/FormField';
import './Form.scss';

export default class Form extends React.Component {
  onUpdateValue(id, value) {
    this.props.onUpdateFieldValue(id, value);
  }
  render() {
    return (
      <form>
        {this.props.fields.map(
          (fieldDef, index) => (
            <FormField
              key={index}
              {...fieldDef}
              onUpdateValue={this.onUpdateValue.bind(this, fieldDef.id)}
            />
          )
        )}

        {this.props.includeSubmitButton && (
          <fieldset>
            <ActionButton onClick={this.props.onSubmit}>
              {this.props.submitText}
            </ActionButton>
          </fieldset>
        )}
      </form>
    );
  }
}

Form.defaultProps = {
  includeSubmitButton: false,
  submitText: 'Start workout',
  onUpdateFieldValue: () => {},
  onSubmit: () => {}
};

Form.propTypes = {
  includeSubmitButton: PropTypes.bool,
  submitText: PropTypes.string,
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  onUpdateFieldValue: PropTypes.func,
  onSubmit: PropTypes.func
};
