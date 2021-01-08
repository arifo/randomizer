import React from 'react';

import { TextInput, StyleSheet, useColorScheme } from 'react-native';

import { s } from 'utils/scaler';

import { BasePopup, PopupProps } from './Base';

interface AlertProps extends PopupProps {
  value: string;
  onChangeText: (t: string) => void;
}

export const Prompt = ({ value, onChangeText, yesPress, ...rest }: AlertProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const inputColor = isDarkMode ? '#ced4da' : '#f5f5f5';

  return (
    <BasePopup yesPress={yesPress} {...rest}>
      <TextInput
        autoFocus
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { backgroundColor: inputColor }]}
        onSubmitEditing={() => yesPress()}
        returnKeyType="done"
      />
    </BasePopup>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 0,
    alignSelf: 'center',
    height: s(40),
    borderRadius: s(8),
    paddingHorizontal: 10,
    fontSize: s(15),
    marginBottom: s(10),
    marginTop: s(10),
  },
});
