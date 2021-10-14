import React from 'react';

import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native';

import { IconNames, icons } from 'assets/images';

import { sv } from 'utils/scaler';

interface Props {
  name: IconNames;
  style?: StyleProp<ImageStyle>;
  size?: number;
  color?: string;
}

export const Icon = ({ style, name, color, size }: Props) => {
  const sizes = typeof size === 'number' ? { width: sv(size), height: sv(size) } : undefined;
  const imageStyles = [styles.icon, sizes, style];

  if (color) {
    imageStyles.push({ tintColor: color });
  }

  return <Image source={icons[name]} style={imageStyles} />;
};

const styles = StyleSheet.create({
  icon: { width: sv(24), height: sv(24) },
});
