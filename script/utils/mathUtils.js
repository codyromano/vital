export const clamp = (value, min, max) => {
  value = Math.min(value, max);
  value = Math.max(value, min);

  return value;
};

export const getPercentProgress = (current, max) => {
  const numerator = Math.min(current, max);
  const denomerator = max;

  return Math.round((numerator / denomerator) * 100);
};

export const convertSensorSpeedToMilesPerHour = (metersPerSecond) => {
  const milesPerSecond = metersPerSecond * 0.000621371;
  return milesPerSecond * 60 * 60;
};

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
  return result;
}
