import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import BasePage from 'vital-components/BasePage';
import fieldsDefinition from './formDefinition';
import './ConfigureMusicPage.scss';

export default class ConfigureMusicPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
  }
  render() {
    return (
      <BasePage>
        <Form fields={fieldsDefinition} />
      </BasePage>
    );
  }
}
