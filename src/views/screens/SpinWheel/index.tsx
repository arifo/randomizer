import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

const SpinWheel = () => {
  return (
    <Container style={styles.container} Header={<Header withSafeArea={false} title="Spin Wheel" />}>
      {/*  */}
      {/*  */}
    </Container>
  );
};

export default SpinWheel;

const styles = StyleSheet.create({
  container: {},
});
