import React from 'react';
import Range from 'vital-components/Range';
import SongOption from 'vital-components/SongOption';

export default [
  {
    id: 'maxSpeed',
    label: 'Max. music tempo',
    optionComponent: Range,
    optionComponentProps: [
      {
        metricLabel: '% faster than normal',
        min: 0,
        max: 100,
        value: 50
      }
    ]
  },
  {
    id: 'minSpeed',
    label: 'Min. music tempo',
    optionComponent: Range,
    optionComponentProps: [
      {
        metricLabel: '% slower than normal',
        min: 0,
        max: 100,
        value: 50
      }
    ]
  },
  {
    id: 'targetMPH',
    label: 'Exercise goal',
    optionComponent: Range,
    optionComponentProps: [
      {
        metricLabel: 'miles per hour',
        min: 1,
        max: 15,
        value: 5,
        step: 0.5,
        precision: 1
      }
    ]
  }
];
