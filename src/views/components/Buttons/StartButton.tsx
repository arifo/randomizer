import React from 'react';

import { StyleSheet, Dimensions, useColorScheme } from 'react-native';

import { theme } from 'theme';

import { Text } from '../Text';

import { ButtonBase } from './Base';

const { width } = Dimensions.get('window');

interface StartButtonProps {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
}

export const StartButton = ({ disabled, text, onPress }: StartButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  return (
    <ButtonBase
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, { backgroundColor: themeColors.startButton }]}
      innerStyle={styles.inner}>
      <Text numberOfLines={1} size={36} color="white">
        {text || 'Start'}
      </Text>
    </ButtonBase>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.4,
    marginBottom: 25,
  },
  inner: { justifyContent: 'center', alignItems: 'center' },
});
