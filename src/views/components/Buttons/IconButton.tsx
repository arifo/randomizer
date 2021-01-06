import React from 'react';

import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableOpacityProps,
  useColorScheme,
  ImageStyle,
} from 'react-native';

import { sv } from 'utils/scaler';

type Icons = 'close' | 'chevron-left' | 'settings';

interface IconButtonProps extends TouchableOpacityProps {
  iconStyle?: ImageStyle;
  icon: Icons;
}

const getIcon = (variant: Icons) => {
  switch (variant) {
    case 'settings':
      return {
        src: require('assets/images/settings.png'),
        style: { width: sv(28), height: sv(28) },
      };
    case 'chevron-left':
      return {
        src: require('assets/images/chevron_left.png'),
        style: { width: sv(36), height: sv(36) },
      };
    case 'close':
      return {
        src: require('assets/images/close.png'),
        style: { width: sv(30), height: sv(30) },
      };
    default:
      return { src: undefined, style: undefined };
  }
};

export const IconButton = ({ iconStyle, icon, ...props }: IconButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const tintColor = isDarkMode ? 'white' : 'black';

  const { src, style } = getIcon(icon);

  if (!src) {
    return null;
  }

  return (
    <TouchableOpacity {...props}>
      <Image source={src} style={[styles.icon, style, { tintColor: tintColor, ...iconStyle }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: { width: sv(24), height: sv(24) },
});
