import React from 'react';
import PropTypes from 'prop-types';
import './Progress.scss';
import { clamp } from 'vital-utils/mathUtils';

const Progress = ({
  label,
  min,
  max,
  value,
  backgroundColor,
  barColor
}) => {

  if (max < min || min > max) {
    throw new Error(`min/max progress props out of bounds`);
  }

  value = clamp(value, min, max);
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
