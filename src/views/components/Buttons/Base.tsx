import * as React from 'react';

import {
  TouchableOpacity,
  Platform,
  View,
  TouchableNativeFeedback,
  ViewProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { theme } from 'theme';

import { s } from 'utils/scaler';

export type ButtonBaseProps = ViewProps & {
  onPress?: () => void;
  onLongPress?: () => void;
  delayPressIn?: number;
  disabled?: boolean;
  borderless?: boolean;
  pressColor?: string;
  color?: string;
  pressOpacity?: number;
  activeOpacity?: number;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
};

const LOLLIPOP = 21;

export const ButtonBase: React.FC<ButtonBaseProps> = ({
  style,
  pressColor = '#83c5be',
  borderless = true,
  children,
  innerStyle,
  color,
  ...rest
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const containerStyles = [
    styles.container,
    { backgroundColor: color || themeColors.menuButton },
    style,
  ];

  if (Platform.OS === 'android') {
    if (Platform.Version >= LOLLIPOP) {
      return (
        <View style={containerStyles}>
          <TouchableNativeFeedback
            accessibilityRole="button"
            {...rest}
            background={TouchableNativeFeedback.Ripple(pressColor, borderless)}>
            <View style={[styles.inner, innerStyle]}>{children}</View>
          </TouchableNativeFeedback>
        </View>
      );
    }

    return (
      <TouchableOpacity accessibilityRole="button" {...rest} style={containerStyles}>
        <View style={[styles.inner, innerStyle]}>{children}</View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.5}
      {...rest}
      style={containerStyles}>
      <View style={[styles.inner, innerStyle]}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: s(10),
    height: s(60),
    width: '100%',
    overflow: 'hidden',
  },
  inner: { flex: 1, paddingHorizontal: s(20) },
});
