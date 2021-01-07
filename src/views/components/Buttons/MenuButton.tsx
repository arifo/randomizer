import React from 'react';

import { StyleSheet, Dimensions, useColorScheme } from 'react-native';

import { theme } from 'theme';
import { s } from 'utils/scaler';

import { Text } from '../Text';

import { ButtonBase } from './Base';

interface MenuButtonProps {
  title: string;
  route: string;
  onPress: (route: string) => void;
}

const { width } = Dimensions.get('window');

const buttonW = width * 0.44;
const buttonH = width * 0.4;

export const MenuButton = ({ title, route, onPress }: MenuButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;

  return (
    <ButtonBase
      onPress={() => onPress(route)}
      style={{
        height: buttonH,
        width: buttonW,
        borderRadius: s(15),
        backgroundColor: themeColors.menuButton,
      }}
      innerStyle={styles.inner}>
      <Text color={'white'} style={{ fontSize: s(22) }}>
        {title}
      </Text>
    </ButtonBase>
  );
};

const styles = StyleSheet.create({
  inner: { justifyContent: 'center', alignItems: 'center' },
});
