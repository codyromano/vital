import React from 'react';
import PropTypes from 'prop-types';
import BasePage, { PageWidthContainer } from 'vital-components/BasePage';
import withAudioSource from 'vital-components/withAudioSource';
import { sharedMusicPreferencesModel } from 'vital-models/MusicPreferencesModel';

// TODO: Change name to 'Visualization' or similar
import App from 'vital-components/App';
import './WorkOutPage.scss';

export default class WorkOutPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      VisualiserComponent: withAudioSource({
        audioContext: new (AudioContext || webkitAudioContext)(),
        sourceUrl: sharedMusicPreferencesModel.getSongSource()
      })(App)
    };
  }
  render() {
    const Visualiser = this.state.VisualiserComponent;

    return (
      <BasePage>
        <Visualiser />
      </BasePage>
    );
  }
}
