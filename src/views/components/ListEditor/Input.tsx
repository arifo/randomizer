import React, { useState } from 'react';

import {
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

export const Input = ({ style, onFocus, onBlur, ...props }: TextInputProps) => {
  const [isFocused, setFocused] = useState(false);
  const { isDarkMode } = useAppTheme();

  const borderColor = isDarkMode ? '#6c757d' : '#dee2e6';
  const color = isDarkMode ? 'white' : 'black';
  const borderBottomWidth = isFocused ? 3 : 1;

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) {
      onFocus(e);
    }
    setFocused(true);
  };
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(e);
    }
    setFocused(false);
  };

  return (
    <TextInput
      maxLength={100}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.input, { borderColor, color, borderBottomWidth }, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    height: s(40),
    borderBottomWidth: 1,
    minWidth: '35%',
    paddingHorizontal: 10,
    fontSize: s(18),
    borderRadius: 10,
  },
});
