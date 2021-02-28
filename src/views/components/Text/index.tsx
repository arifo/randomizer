import React from 'react';

import { Text as RnText, StyleProp, TextStyle, TextProps } from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

export interface RNTextProps extends TextProps {
  // font?: keyof typeof Fonts;
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
}

export const Text: React.FC<RNTextProps> = ({ children, size, color, style, ...restProps }) => {
  const { themeColors } = useAppTheme();

  const fontSize = typeof size === 'number' ? s(size) : undefined;
  return (
    <RnText {...restProps} style={[{ color: color || themeColors.text, fontSize }, style]}>
      {children}
    </RnText>
  );
};
