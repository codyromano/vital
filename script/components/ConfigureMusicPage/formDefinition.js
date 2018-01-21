import React from 'react';
import Range from 'vital-components/Range';
import SongOption from 'vital-components/SongOption';

export default function getFieldsDefinition(songs) {
  console.log(songs);
  const fields = [
    {
      id: 'song',
      label: 'Choose a song',
      optionComponent: SongOption,
      optionComponentProps: songs.map(song => ({
        optionId: song.id,
        name: 'songOption',
        title: song.name,
        previewUrl: song.mediaLink
      }))
    }
  ];

  return fields;
}
