import React from 'react';
import PropTypes from 'prop-types';
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
        <fieldset>
          <button onClick={this.props.onSubmit}>
            {this.props.submitText}
          </button>
        </fieldset>
      </form>
    );
  }
}

Form.defaultProps = {
  submitText: 'Start workout',
  onUpdateFieldValue: () => {},
  onSubmit: () => {}
};

Form.propTypes = {
  submitText: PropTypes.string,
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  onUpdateFieldValue: PropTypes.func,
  onSubmit: PropTypes.func
};
