import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import { withRouter } from 'react-router-dom';
import { withModel } from 'vital-components/ModelProvider';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import ActionButton from 'vital-components/ActionButton';
import fieldsDefinition from './formDefinition';
import './ConfigureStatsPage.scss';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';

class ConfigureStatsPage extends React.Component {
  static propTypes = {
    model: PropTypes.shape({
      song: PropTypes.string
    }).isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    (event && event.preventDefault());

    const songPageUrl = `/work-out/${this.props.model.song}`;
    this.props.history.push(songPageUrl);
  }
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <Form
            fields={fieldsDefinition}
            onSubmit={this.onSubmit}
            onUpdateFieldValue={this.props.updateModel}
          />
          <ActionButton
            onClick={this.onSubmit}
          >Start work-out</ActionButton>

        </PageWidthContainer>

        {/* Implement layout components with standardized margins */}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </BasePage>
    );
  }
}

export default withRouter(
  withModel(
    ConfigureStatsPage
  )
);
