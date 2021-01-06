import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

const WordScreen = () => {
  return (
    <Container Header={<Header withSafeArea={false} title="Random word" />}>
      {/*  */}
      {/*  */}
      <Text>Word</Text>
    </Container>
  );
};

export default WordScreen;

const styles = StyleSheet.create({
  container: {},
});
