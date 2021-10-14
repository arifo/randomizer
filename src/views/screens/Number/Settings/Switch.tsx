import React from 'react';

import { Switch } from 'react-native';

import { SettingsItem } from 'views/components/SettingsItem';

interface Props {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SettingsSwitch = ({ label, value, onChange }: Props) => {
  return (
    <SettingsItem label={label}>
      <Switch value={value} onValueChange={onChange} />
    </SettingsItem>
  );
};
