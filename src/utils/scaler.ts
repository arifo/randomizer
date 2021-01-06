import { Dimensions, PixelRatio } from 'react-native';

export const roundPixel = (size: number) => PixelRatio.roundToNearestPixel(size);

const guideline = {
  width: 375,
  height: 812,
};

const { width, height } = Dimensions.get('screen');

const scaleByWidth = (size: number) => roundPixel((size / guideline.width) * width);
const scaleByHeight = (size: number) => roundPixel((size / guideline.height) * height);

const fontHeightStyles = (fontSize: number) => {
  return {
    lineHeight: scaleByWidth(fontSize * 1.25),
    height: scaleByWidth(fontSize * 1.3),
    fontSize: scaleByWidth(fontSize),
  };
};

export { scaleByHeight as sv, scaleByWidth as s, fontHeightStyles };
