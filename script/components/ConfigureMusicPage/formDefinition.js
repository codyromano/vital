import React from 'react';
import Range from 'vital-components/Range';

// TODO: Move SongOption to its own file
const SongOption = ({
  optionId,
  source,
  name,
  title,
  onUpdateValue,
  selected
}) => {
  return (<div>
    <input
      type="radio"
      name={name}
      id={`song-option-${optionId}`}
      onClick={event => onUpdateValue({ optionId, source })}
      defaultChecked={selected}
    />
    <label htmlFor={`song-option-${optionId}`}>{title}</label>
  </div>);
};

SongOption.defaultProps = {
  selected: false
};

export default [
  {
    id: 'song',
    label: 'Choose an EDM mix',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        optionId: 'bassnectar',
        name: 'songOption',
        title: 'Bassnectar',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY',
        selected: true
      },
      {
        optionId: 'martin-garrix-animals',
        name: 'songOption',
        title: 'Martin Garrix',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY'
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