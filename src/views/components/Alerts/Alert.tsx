import React from 'react';

import { StyleSheet } from 'react-native';

import { s } from 'utils/scaler';

import { Text } from '../Text';

import { BasePopup, PopupProps } from './Base';

interface AlertProps extends PopupProps {
  message?: string;
}

export const Alert = ({ message, ...props }: AlertProps) => {
  return (
    <BasePopup {...props}>{!!message && <Text style={styles.message}>{message}</Text>}</BasePopup>
  );
};

const styles = StyleSheet.create({
  message: {
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: s(15),
  },
});
