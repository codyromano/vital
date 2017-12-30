import React from 'react';
import PropTypes from 'prop-types';
import './MetricDisplay.scss';

// TODO: Move to component file
const MetricDisplay = ({
  overdrive,
  metric,
  unit,
  precision = 2
}) => {
  if (typeof metric === 'number') {
    metric = metric.toFixed(precision);
  }
  const classList = ['speed-display'];
  if (overdrive) {
    classList.push('speed-display-overdrive');
  }

  return (
    <div className={classList.join(' ')}>
      {metric}<small>{unit}</small>
    </div>
  );
};

export default MetricDisplay;
