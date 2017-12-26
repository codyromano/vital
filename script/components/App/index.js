import React from 'react';
import PropTypes from 'prop-types';
import BufferLoader from '../../utils/BufferLoader';

let context, bufferLoader;

function init() {
  context = new (AudioContext || webkitAudioContext)();

  bufferLoader = new BufferLoader(
    context,
    [
      './sounds/tycho-a-walk.wav'
    ],
    finishedLoading
   );
  bufferLoader.load();
}

const store = {
  speed: 0.5
};

let source1;

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  source1 = context.createBufferSource();


  source1.playbackRate.value = store.speed;

  source1.buffer = bufferList[0];
  source1.connect(context.destination);
  source1.start(0);
}

export default class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		init();
	}
	render() {
		return (
			<div>Maiasdfn app</div>
		);
	}
}
