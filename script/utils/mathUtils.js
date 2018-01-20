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

export class PlaybackRateCalculator {
  // Limit playback rate changes to 1 per 10 seconds because constant
  // changes ruin the listening experience
  static calculationFrequencyLimit = 1000 * 5;

  constructor() {
    this.timePlaybackRateLastCalculated = null;
    this.cachedPlaybackRate = null;
  }

  cachedPlaybackRateIsValid() {
    if (!this.cachedPlaybackRate || !this.timePlaybackRateLastCalculated) {
      return false;
    }
    const timeSinceCalculation = new Date().getTime() -
      this.timePlaybackRateLastCalculated;

    return (timeSinceCalculation <
      PlaybackRateCalculator.calculationFrequencyLimit);
  }

  getRate({
    targetMPH,
    currentMPH,
    maxSpeed,
    minSpeed
  }) {
    if (this.cachedPlaybackRateIsValid()) {
      console.log('using cached: ', this.cachedPlaybackRate);
      return this.cachedPlaybackRate;
    }

    const result = clamp(
      (currentMPH / targetMPH) * maxSpeed,
      minSpeed,
      maxSpeed
    );

    if (isNaN(result)) {
      console.warn('Calculated playback rate is not a number');
      return 0;
    }

    this.timePlaybackRateLastCalculated = new Date().getTime();
    this.cachedPlaybackRate = result;
    console.log('using new: ', this.cachedPlaybackRate);

    return result;
  }
}
