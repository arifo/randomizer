import React from 'react';

import { View, StyleSheet } from 'react-native';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

const ListScreen = () => {
  return (
    <Container Header={<Header withSafeArea={false} title="List Randomizer" />}>
      {/*  */}
      {/*  */}
      <Text>List</Text>
    </Container>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {},
});
