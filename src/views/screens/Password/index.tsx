import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

const PasswordScreen = () => {
  return (
    <Container Header={<Header withSafeArea={false} title="Generate password" />}>
      {/*  */}
      {/*  */}
      <Text>Password</Text>
    </Container>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {},
});
