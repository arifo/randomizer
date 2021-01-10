import React from 'react';

import { StyleSheet, Dimensions, useColorScheme, View } from 'react-native';

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
    <View style={[styles.container, { backgroundColor: themeColors.startButton }]}>
      <ButtonBase
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, { backgroundColor: themeColors.startButton }]}
        innerStyle={styles.inner}>
        <Text numberOfLines={1} size={36} color="white">
          {text || 'Start'}
        </Text>
      </ButtonBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.4,
    marginBottom: 25,
    elevation: 8,
    shadowColor: 'rgba(92, 92, 92,0.5)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  button: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.4,
  },
  inner: { justifyContent: 'center', alignItems: 'center' },
});
