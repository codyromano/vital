import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import { withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import ActionButton from 'vital-components/ActionButton';
import fieldsDefinition from './formDefinition';
import './ConfigureStatsPage.scss';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';

const mapFieldIdToModelUpdateMethod = {
  // TODO: Add field update methods
  'targetMPH': sharedMusicPreferencesModel.updateTargetMPH
};

class ConfigureStatsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onUpdateFieldValue = this.onUpdateFieldValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    (event && event.preventDefault());

    const songId = sharedMusicPreferencesModel.getSongId();
    const songPageUrl = `/work-out/${songId}`;
    this.props.history.push(songPageUrl);
  }
  onUpdateFieldValue(fieldId, fieldValue) {
    const updateFn = mapFieldIdToModelUpdateMethod[fieldId];
    updateFn.call(sharedMusicPreferencesModel, fieldValue);
  }
  render() {
    return (
      <BasePage>
        <PageWidthContainer>
          <Form
            fields={fieldsDefinition}
            onSubmit={this.onSubmit}
            onUpdateFieldValue={this.onUpdateFieldValue}
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

export default withRouter(ConfigureStatsPage);
