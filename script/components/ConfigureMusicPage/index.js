import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import { withRouter } from 'react-router-dom';
import { withModel, modelApiShape } from 'vital-components/ModelProvider';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import fieldsDefinition from './formDefinition';
import './ConfigureMusicPage.scss';

class ConfigureMusicPage extends React.Component {
  static propTypes = {
    ...modelApiShape
  };
  componentWillReceiveProps(newProps) {
    if (newProps.model.song) {
      this.props.history.push('/configure-stats');
    }
  }
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <Form fields={fieldsDefinition} />
        </PageWidthContainer>
      </BasePage>
    );
  }
}

export default withRouter(
  withModel(ConfigureMusicPage)
);
