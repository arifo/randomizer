import React from 'react';

import { StyleSheet, Dimensions, View } from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

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
  const { themeColors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.menuButton }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: buttonH,
    width: buttonW,
    borderRadius: s(15),
    elevation: 8,
    shadowColor: 'rgba(92, 92, 92,0.5)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  inner: { justifyContent: 'center', alignItems: 'center' },
});
