import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

const YesOrNoScreen = () => {
  return (
    <Container Header={<Header withSafeArea={false} title="Yes or No" />}>
      {/*  */}
      {/*  */}
      <Text>YesOrNo</Text>
    </Container>
  );
};

export default YesOrNoScreen;

const styles = StyleSheet.create({
  container: {},
});
