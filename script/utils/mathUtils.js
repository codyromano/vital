export const clamp = (value, min, max) => {
  value = Math.min(value, max);
  value = Math.max(value, min);

  return value;
};

export const calculateBoostRate = (
  currentMPH,
  targetMPH
) => {
  const result = Math.min(100, (currentMPH / targetMPH)).toPrecision(1);
  return parseFloat(result);
}

export const getPlaybackRate = ({
  targetMPH, currentMPH, maxSpeed, minSpeed
}) => {
  const result = clamp(
    (currentMPH / targetMPH) * maxSpeed,
    minSpeed,
    maxSpeed
  );
  // TODO: Why is current MPH showing as NaN sometimes?
  if (isNaN(result)) {
    console.warn('Calculated playback rate is not a number');
    return 0;
  }
  console.log('Calculated playback rate: ', result);
  return result;
}
