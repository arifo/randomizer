import React from 'react';

import { View, StyleSheet } from 'react-native';

import Header from 'views/components/Header';
import { useAppTheme } from 'views/contexts/useAppTheme';

const ImageRandomizer = () => {
  const { themeColors } = useAppTheme();

  const backgroundColor = themeColors.backgroundColor;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title="ImageRandomizer" />
    </View>
  );
};

export default ImageRandomizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
