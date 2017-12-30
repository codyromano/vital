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
      onClick={event => onUpdateValue(source)}
    />
    <label htmlFor={`song-option-${optionId}`}>{title}</label>
  </div>);
};

export default [
  {
    id: 'song',
    label: 'Choose an electronic song',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        optionId: 1,
        name: 'songOption',
        title: 'Give Her Right Back',
        source: './sounds/give-her-right-back.wav'
      },
      {
        optionId: 2,
        name: 'songOption',
        title: 'A Walk',
        source: './sounds/tycho-a-walk.wav'
      }
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