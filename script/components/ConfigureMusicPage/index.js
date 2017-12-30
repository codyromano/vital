import React from 'react';
import PropTypes from 'prop-types';
import Form from 'vital-components/Form';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import fieldsDefinition from './formDefinition';
import './ConfigureMusicPage.scss';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';

const mapFieldIdToUpdateMethod = {
  'song': sharedMusicPreferencesModel.updateSongSource,
  'maxSpeed': sharedMusicPreferencesModel.updateSongMaximumSpeed,
  'minSpeed': sharedMusicPreferencesModel.updateSongMinimumSpeed
};

export default class ConfigureMusicPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onUpdateFieldValue = this.onUpdateFieldValue.bind(this);
  }
  onUpdateFieldValue(fieldId, fieldValue) {
    const updateFn = mapFieldIdToUpdateMethod[fieldId];
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
            onUpdateFieldValue={this.onUpdateFieldValue}
          />
        </PageWidthContainer>
      </BasePage>
    );
  }
}
