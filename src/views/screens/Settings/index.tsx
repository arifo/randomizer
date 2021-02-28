import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { useAction } from 'hooks/useAction';
import { setDarkAction } from 'modules/app/actions';
import { RootState } from 'types';

import { s } from 'utils/scaler';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { SettingsItem } from 'views/components/SettingsItem';

import { Text } from 'views/components/Text';

const SettingsScreen = () => {
  const setDarkMode = useAction(setDarkAction);
  const { darkMode } = useSelector((state: RootState) => state.app);
  return (
    <Container Header={<Header withSafeArea={false} title="Settings" />}>
      <SettingsItem label={'Dark mode'}>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </SettingsItem>
    </Container>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {},
});
