import React from 'react';
import PropTypes from 'prop-types';
import './SongOption.scss';
import ActionButton from 'vital-components/ActionButton';
import AudioPreviewButton from 'vital-components/AudioPreviewButton';

const SongOption = ({
  optionId,
  source,
  name,
  title,
  onUpdateValue,
  selected,
  previewUrl
}) => {
  return (
    <div className="song-option" key={optionId}>
      <strong className="song-title">{title}</strong>

      <ul className="song-buttons">
        <li className="song-button-list-item">
          <AudioPreviewButton songUrl={previewUrl} />
        </li>
        <li className="song-button-list-item">
          <ActionButton onClick={event => onUpdateValue({ optionId, source })}>
            Select
          </ActionButton>
        </li>
      </ul>
    </div>
  );
};

SongOption.defaultProps = {
  selected: false
};

export default SongOption;
