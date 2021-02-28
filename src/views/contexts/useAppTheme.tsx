import React from 'react';

import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from 'theme';
import { RootState } from 'types';

export const useAppTheme = () => {
  const { darkMode } = useSelector((state: RootState) => state.app);
  const themeColors = darkMode ? theme.dark : theme.light;

  return { isDarkMode: darkMode, themeColors };
};
