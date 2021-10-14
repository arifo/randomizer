import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

import { s } from 'utils/scaler';
import { isNumber } from 'utils/strings';
import { SettingsItem } from 'views/components/SettingsItem';
import { useAppTheme } from 'views/contexts/useAppTheme';

interface Props {
  label: string;
  value: string | number;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  onChange: (value: number) => void;
}

export const SettingInput = ({ label, value, onBlur, onSubmitEditing, onChange }: Props) => {
  const { isDarkMode } = useAppTheme();

  const handleInput = (t: string) => {
    if (!t) {
      onChange(t);
      return;
    }
    if (isNumber(t)) {
      onChange(Number(t));
    }
  };

  const color = isDarkMode ? 'white' : 'black';

  return (
    <SettingsItem label={label}>
      <TextInput
        value={`${value}`}
        onChangeText={handleInput}
        numberOfLines={1}
        maxLength={7}
        keyboardType={'number-pad'}
        returnKeyLabel="Done"
        returnKeyType="done"
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        style={[styles.input, { color }]}
      />
    </SettingsItem>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: s(17),
    textAlign: 'center',
    flex: 1,
    width: '100%',
  },
});
