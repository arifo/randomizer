import React from 'react';

import { View, StyleSheet, TextInputProps, TextStyle, KeyboardAvoidingView } from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { Input } from './Input';

interface InputFieldProps extends TextInputProps {
  title?: string;
  style?: TextStyle;
  actionButton?: React.ReactNode;
}

export const InputField = ({ actionButton, ...props }: InputFieldProps) => {
  const { isDarkMode } = useAppTheme();

  const backgroundColor = isDarkMode ? '#6c757d' : '#dee2e6';
  const inputColor = isDarkMode ? '#212529' : '#6c757d';
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ backgroundColor }}>
      <View style={styles.field}>
        <Input
          placeholder="enter item name"
          placeholderTextColor={isDarkMode ? '#adb5bd' : '#ced4da'}
          returnKeyType="done"
          {...props}
          style={[styles.fieldInput, { backgroundColor: inputColor }]}
        />
        {actionButton}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: s(20),
  },
  fieldInput: {
    padding: 0,
    flex: 1,
    borderBottomWidth: 0,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
  },
});
