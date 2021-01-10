import React from 'react';

import { View, StyleSheet, useColorScheme } from 'react-native';

import { theme } from 'theme';

import Header from 'views/components/Header';

const ImageRandomizer = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
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
