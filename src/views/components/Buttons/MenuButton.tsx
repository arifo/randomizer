import React from 'react';

import { View, StyleSheet } from 'react-native';

import { ButtonBase } from './Base';

interface MenuButtonProps {}

const MenuButton = ({ children }: MenuButtonProps) => {
  return <ButtonBase>{children}</ButtonBase>;
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {},
});
