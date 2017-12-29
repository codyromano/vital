const generateRandomRGBValue = (lowerbound = 0) => Math.round(
    Math.random() * (255 - lowerbound)
);

// Use a lowerbound to prevent dark colors
const rgbLowerbound = 175;
const randomRGBWithLowerBound = generateRandomRGBValue.bind(
  null,
  rgbLowerbound
);

let rgbValues = [
  randomRGBWithLowerBound(),
  randomRGBWithLowerBound(),
  randomRGBWithLowerBound()
];

export default function generateRandomShiftingWaveFormColor(
  analyser,
  bufferDataArray
) {

  rgbValues = rgbValues.map(value => {
    return value + 1 <= 255 ? (value + 1) : rgbLowerbound;
  });

  const rgbString = `rgb(${rgbValues.join(',')})`;

  return rgbString;
}
