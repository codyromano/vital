import React from 'react';
import PropTypes from 'prop-types';
import './MetricDisplay.scss';

const MetricDisplay = ({
  overdrive,
  metric,
  color,
  unit,
  size,
  precision
}) => {
  if (typeof metric === 'number') {
    metric = Math.min(metric, 99.99);
    metric = metric.toFixed(precision);
  }
  const classList = [
    'speed-display',
    `speed-display-${size}`
  ];
  if (overdrive) {
    classList.push('speed-display-overdrive');
  }

  return (
    <div className={classList.join(' ')}>
      <span style={{color}}>
        {metric}
      </span>
      <small>{unit}</small>
    </div>
  );
};

MetricDisplay.defaultProps = {
  precision: 2,
  size: 'regular',
  color: '#000'
};

MetricDisplay.propTypes = {
  precision: PropTypes.number,
  size: PropTypes.oneOf(['small', 'regular', 'large'])
};

export default MetricDisplay;
