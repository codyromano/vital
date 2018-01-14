import React from 'react';
import Range from 'vital-components/Range';

// TODO: Move SongOption to its own file
const SongOption = ({
  optionId,
  source,
  name,
  title,
  onUpdateValue
}) => {
  return (<div>
    <input
      type="radio"
      name={name}
      id={`song-option-${optionId}`}
      onClick={event => onUpdateValue({ optionId, source })}
    />
    <label htmlFor={`song-option-${optionId}`}>{title}</label>
  </div>);
};

export default [
  {
    id: 'song',
    label: 'Choose an EDM mix',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        optionId: 'ultimate-club-mix',
        name: 'songOption',
        title: 'Deadmau5 ultimate club mix',
        source: 'https://storage.cloud.google.com/databassio/deadmau5-club-mix.mp3'
      },
      {
        optionId: 'extreme-bass-boost',
        name: 'songOption',
        title: 'Extreme Bass Boost',
        source: 'https://storage.cloud.google.com/databassio/extreme-bass-boost.mp3'
      },
      {
        optionId: 'a-walk',
        name: 'songOption',
        title: 'A Walk',
        source: './sounds/tycho-a-walk.wav'
      },
      {
        optionId: 'when-will-the-bass-drop',
        name: 'songOption',
        title: 'When will the bass drop?',
        source: 'https://storage.cloud.google.com/databassio/bass-drop.wav'
      },
    ]
  },
  {
    id: 'maxSpeed',
    label: 'Maximum speed',
    helpText: 'How much the song speed will increase as you run',
    optionComponent: Range,
    optionComponentProps: [
      {
        min: 1.0,
        max: 3.0
      }
    ]
  },
  {
    id: 'minSpeed',
    label: 'Minimum speed',
    helpText: 'How much the song will slow down when you stop',
    optionComponent: Range,
    optionComponentProps: [
      {
        min: 0.0,
        max: 1.0
      }
    ]
  }
];