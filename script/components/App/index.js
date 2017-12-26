import React from 'react';
import { getDecodedAudioDataFromUrl, connectNewBufferSource } from 'vital-utils/audioUtils'

async function init() {
	try {
		const audioContext = new (AudioContext || webkitAudioContext)();
		const audioData = await getDecodedAudioDataFromUrl(
			audioContext,
			'./sounds/tycho-a-walk.wav'
		);
		const source = connectNewBufferSource(audioContext, audioData);
		source.start(0);

	} catch(err) {
		console.error(err);
	}
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
