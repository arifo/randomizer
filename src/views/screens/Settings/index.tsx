import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import InAppReview from 'react-native-in-app-review';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';

import { useAction } from 'hooks/useAction';
import { setDarkAction } from 'modules/app/actions';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { SettingsItem } from 'views/components/SettingsItem';
import { Text } from 'views/components/Text';
import { useAppTheme } from 'views/contexts/useAppTheme';

const shareIcon = require('assets/images/share.png');
const rateIcon = require('assets/images/star_outline.png');

const googlePlayLink = 'https://play.google.com/store/apps/details?id=com.arifoapps.randomize';

const FooterButton = ({
  icon,
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
  icon?: number;
}) => {
  const { themeColors } = useAppTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.textButton}>
      {!!icon && (
        <Image source={icon} style={[styles.icon, { tintColor: themeColors.iconButton }]} />
      )}
      <Text size={16} style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const setDarkMode = useAction(setDarkAction);
  const { darkMode } = useSelector((state: RootState) => state.app);
  const { isDarkMode } = useAppTheme();
  const borderColor = isDarkMode ? 'rgba(52, 58, 64,0.5)' : 'rgba(206, 212, 218,0.5)';

  const onShare = async () => {
    try {
      await Share.open({
        title: 'App link',
        message: 'Download Random app\n',
        url: googlePlayLink,
      });
    } catch (error) {
      // alert(error.message);
    }
  };

  const onRate = () => {
    const isAvailable = InAppReview.isAvailable();

    if (!isAvailable) {
      return;
    }
    InAppReview.RequestInAppReview();
  };
  return (
    <Container
      Header={<Header withSafeArea={false} title="Settings" />}
      Footer={
        <View style={{ paddingBottom: s(25) }}>
          <FooterButton icon={shareIcon} text="Share App" onPress={onShare} />
          <View style={[styles.line, { backgroundColor: borderColor }]} />
          <FooterButton icon={rateIcon} text="Rate App" onPress={onRate} />
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
  container: {},
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
  line: {
    width: '15%',
    height: 2,
    alignSelf: 'center',
  },
});
