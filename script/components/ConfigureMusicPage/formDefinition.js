import React from 'react';
import Range from 'vital-components/Range';

const SongOption = ({ title }) => (
  <div>{title}</div>
);

export default [
  {
    label: 'Choose an electronic song',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        title: 'Give Her Right Back'
      },
      {
        title: 'A Walk'
      }
    ]
  },
  {
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