import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

const SettingsScreen = () => {
  return (
    <Container Header={<Header withSafeArea={false} title="Settings" />}>
      {/*  */}
      {/*  */}
      <Text>YSettings</Text>
    </Container>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {},
});
