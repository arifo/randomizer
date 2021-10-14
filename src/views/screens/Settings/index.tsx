import React, { useCallback } from 'react';

import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import InAppReview from 'react-native-in-app-review';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';

import { setDarkAction } from 'modules/app/actions';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { SettingsItem } from 'views/components/SettingsItem';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { SettingsButton } from './Button';

const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.arifoapps.randomize';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.app);
  const { isDarkMode } = useAppTheme();
  const borderColor = isDarkMode ? 'rgba(52, 58, 64,0.5)' : 'rgba(206, 212, 218,0.5)';

  const onShare = async () => {
    try {
      const options = {
        title: 'App link',
        message: 'Download Random app\n',
        url: googlePlayLink,
      };
      await Share.open(options);
    } catch (error) {
      // alert(error.message);
    }
  };

  const setDarkMode = useCallback(
    (val: boolean) => {
      dispatch(setDarkAction(val));
    },
    [dispatch],
  );

  const onRate = useCallback(() => {
    const isAvailable = InAppReview.isAvailable();

    if (!isAvailable) {
      return;
    }
    InAppReview.RequestInAppReview();
  }, []);

  return (
    <Container
      Header={<Header withSafeArea={false} title="Settings" />}
      Footer={
        <View style={{ paddingBottom: s(25) }}>
          <SettingsButton icon={'share'} text="Share App" onPress={onShare} />
          <View style={[styles.line, { backgroundColor: borderColor }]} />
          <SettingsButton icon={'rate'} text="Rate App" onPress={onRate} />
        </View>
      }>
      <SettingsItem label={'Dark mode'}>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </SettingsItem>
    </Container>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  line: {
    width: '15%',
    height: 2,
    alignSelf: 'center',
  },
});
