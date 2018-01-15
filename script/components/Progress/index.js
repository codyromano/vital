import React from 'react';
import PropTypes from 'prop-types';
import './Progress.scss';

const Progress = ({
  label,
  min,
  max,
  value,
  backgroundColor,
  barColor
}) => {

  const width = `${Math.round((value / max) * 100)}%`;

  return (
    <div
      style={{ backgroundColor }}
      className="progress"
    >
      <div
        style={{ width, backgroundColor: barColor }}
        className="progress-bar"></div>

      <span className="progress-label">
        {label}
      </span>
    </div>
  );
};

Progress.defaultProps = {
  label: 'Progress',
  min: 0,
  max: 100,
  backgroundColor: '#fff',
  barColor: 'aqua'
};

Progress.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  barColor: PropTypes.string
};

export default Progress;

/*
        <Progress
          label="Sound intensity"
          min={0}
          max={100}
          value={0}
          backgroundColor="#fff"
          barColor="aqua"
        />
*/
