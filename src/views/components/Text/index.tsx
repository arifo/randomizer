import React from 'react';

import {
  Text as RnText,
  StyleSheet,
  useColorScheme,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native';

import { theme } from 'theme';
import { s } from 'utils/scaler';

export interface RNTextProps extends TextProps {
  // font?: keyof typeof Fonts;
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
}

export const Text: React.FC<RNTextProps> = ({ children, size, color, style, ...restProps }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const fontSize = typeof size === 'number' ? s(size) : undefined;
  return (
    <RnText {...restProps} style={[{ color: color || themeColors.text, fontSize }, style]}>
      {children}
    </RnText>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
