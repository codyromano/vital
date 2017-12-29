import React from 'react';
import PropTypes from 'prop-types';
import FormField, { fieldShape } from 'vital-components/FormField';
import './Form.scss';

export default class Form extends React.Component {
  render() {
    return (
      <form>
        {this.props.fields.map(
          (fieldDef, index) => <FormField key={index} {...fieldDef} />
        )}
      </form>
    );
  }
}

Form.propTypes = {
  fields: PropTypes.arrayOf(fieldShape).isRequired
};
