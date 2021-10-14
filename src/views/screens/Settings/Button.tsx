import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import { IconNames } from 'assets/images';
import { s } from 'utils/scaler';
import { Icon } from 'views/components/Icon';
import { Text } from 'views/components/Text';
import { useAppTheme } from 'views/contexts/useAppTheme';

interface Props {
  text: string;
  onPress: () => void;
  icon?: IconNames;
}

export const SettingsButton = ({ icon, text, onPress }: Props) => {
  const { themeColors } = useAppTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.textButton}>
      {!!icon && <Icon name={icon} style={[styles.icon, { tintColor: themeColors.iconButton }]} />}
      <Text size={16} style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    paddingVertical: 20,
    paddingRight: s(24),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '35%',
  },
  icon: {
    width: s(24),
    height: s(24),
    marginRight: s(10),
  },
  text: { fontWeight: 'bold' },
});
