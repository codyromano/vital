import React from 'react';
import PropTypes from 'prop-types';
import Range from 'vital-components/Range';
import withAudioSource from 'vital-components/withAudioSource';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.audioSource.start();
  }
  render() {
    return (
      <div>
        <Range onValueChanged={(value) => console.log(value)}/>
      </div>
    );
  }
}

export default withAudioSource({
  audioContext: new (AudioContext || webkitAudioContext)(),
  sourceUrl: './sounds/tycho-a-walk.wav'
})(App);
