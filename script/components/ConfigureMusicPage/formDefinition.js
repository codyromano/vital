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
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY'
      },
      {
        optionId: 'martin-garrix-animals',
        name: 'songOption',
        title: 'Martin Garrix - Animals',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY'
      },
      {
        optionId: 'extreme-bass-boost',
        name: 'songOption',
        title: 'Extreme Bass Boost',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY'
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
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY'
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