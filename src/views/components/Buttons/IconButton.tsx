import React from 'react';

import {
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableOpacityProps,
  useColorScheme,
  ImageStyle,
} from 'react-native';

import { theme } from 'theme';

import { sv } from 'utils/scaler';

const hitSlop = { top: 15, left: 15, right: 15, bottom: 15 };

type Icons = 'chevron-left' | 'close' | 'plus-circle' | 'settings';

interface IconButtonProps extends TouchableOpacityProps {
  iconStyle?: ImageStyle;
  icon: Icons;
}

const getIcon = (variant: Icons) => {
  switch (variant) {
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
    case 'plus-circle':
      return {
        src: require('assets/images/circle-plus.png'),
        style: { width: sv(30), height: sv(30) },
      };
    case 'settings':
      return {
        src: require('assets/images/settings.png'),
        style: { width: sv(28), height: sv(28) },
      };
    default:
      return { src: undefined, style: undefined };
  }
};

export const IconButton = ({ iconStyle, icon, ...props }: IconButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const tintColor = themeColors.iconButton;

  const { src, style } = getIcon(icon);

  if (!src) {
    return null;
  }

  return (
    <TouchableOpacity hitSlop={hitSlop} {...props}>
      <Image source={src} style={[styles.icon, style, { tintColor: tintColor, ...iconStyle }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: { width: sv(24), height: sv(24) },
});
