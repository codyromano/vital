import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import { withRouter } from 'react-router-dom';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import fieldsDefinition from './formDefinition';
import './ConfigureMusicPage.scss';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';

const mapFieldIdToModelUpdateMethod = {
  'song': sharedMusicPreferencesModel.updateSongSource,
  'maxSpeed': sharedMusicPreferencesModel.updateSongMaximumSpeed,
  'minSpeed': sharedMusicPreferencesModel.updateSongMinimumSpeed
};

class ConfigureMusicPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onUpdateFieldValue = this.onUpdateFieldValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    this.props.history.push('/work-out');
  }
  onUpdateFieldValue(fieldId, fieldValue) {
    const updateFn = mapFieldIdToModelUpdateMethod[fieldId];
    updateFn.call(sharedMusicPreferencesModel, fieldValue);
  }
  componentDidMount() {
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
        </PageWidthContainer>
      </BasePage>
    );
  }
}

export default withRouter(ConfigureMusicPage);
