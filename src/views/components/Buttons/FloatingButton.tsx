import React from 'react';

import { View, StyleSheet, Image } from 'react-native';

import { s, sv } from 'utils/scaler';

import { ButtonBase } from './Base';

interface FloatingButtonProps {
  onPress?: () => void;
  position?: 'relative' | 'absolute';
}

export const FloatingButton = ({ onPress, position = 'absolute' }: FloatingButtonProps) => {
  return (
    <View style={[styles.container, position === 'absolute' && styles.absolute]}>
      <ButtonBase
        hitSlop={{ top: 20, left: 20, right: 20, bottom: 10 }}
        onPress={onPress}
        style={styles.button}
        innerStyle={styles.inner}>
        <Image source={require('assets/images/add.png')} style={styles.icon} />
      </ButtonBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: s(60),
    width: s(60),
    borderRadius: s(30),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 11,
  },
  absolute: { position: 'absolute', bottom: 35, right: 30 },
  button: {
    height: s(60),
    width: s(60),
    borderRadius: s(30),
    backgroundColor: '#ee6c4d',
  },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: { width: sv(35), height: sv(35), tintColor: 'white' },
});
