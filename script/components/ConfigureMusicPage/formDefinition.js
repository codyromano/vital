import React from 'react';
import Range from 'vital-components/Range';
import SongOption from 'vital-components/SongOption';

export default [
  {
    id: 'song',
    label: 'Choose a song',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        optionId: 'audien',
        name: 'songOption',
        title: 'Audien',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY',
        selected: true,
        previewUrl: 'https://storage.cloud.google.com/databassio/audien.mp3'
      },
      {
        optionId: 'bassnectar',
        name: 'songOption',
        title: 'Bassnectar',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY',
        selected: false,
        previewUrl: 'https://storage.cloud.google.com/databassio/bassnectar.mp3?authuser=0'
      },
      {
        optionId: 'martin-garrix-animals',
        name: 'songOption',
        title: 'Martin Garrix',
        source: 'DEPRECATED-REMOVE-THIS-PROPERTY',
        previewUrl: 'https://storage.cloud.google.com/databassio/martin-garrix-animals.mp3?authuser=0'
      }
    ]
  }

  /*
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
  */
];
