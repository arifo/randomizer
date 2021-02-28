import React, { useState } from 'react';

import { View, StyleSheet, LayoutAnimation, TouchableOpacity } from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { ButtonBase } from '../Buttons';
import { Text } from '../Text';

interface SettingsItem {
  label: string;
}

export const SettingsItem: React.FC<SettingsItem> = ({ label, children }) => {
  const { isDarkMode } = useAppTheme();

  const [hintVisible, showHint] = useState(false);

  const toggleHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showHint(!hintVisible);
  };

  const hideHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showHint(false);
  };

  const borderColor = isDarkMode ? 'rgba(52, 58, 64,0.5)' : 'rgba(206, 212, 218,0.5)';

  return (
    <View style={[styles.settingItem, { borderBottomColor: borderColor }]}>
      <View style={styles.settingButtonWrapper}>
        <ButtonBase
          disabled
          onPress={toggleHint}
          innerStyle={styles.settingBtnInner}
          style={styles.settingsBtn}>
          <Text size={18}>{label}</Text>
        </ButtonBase>

        <View style={[styles.settingRight, { backgroundColor: borderColor }]}>{children}</View>
      </View>
      {hintVisible && (
        <TouchableOpacity activeOpacity={0.8} onPress={hideHint}>
          <View style={styles.ph}>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  settingButtonWrapper: {
    flexDirection: 'row',
    height: s(50),
  },
  settingsBtn: { width: 'auto', height: 'auto', flex: 1, backgroundColor: 'transparent' },
  settingBtnInner: { justifyContent: 'center', paddingHorizontal: 0 },

  settingRight: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 3,
  },

  restoreBtn: {
    height: 'auto',
    width: 'auto',
    marginHorizontal: s(20),
    marginTop: 45,
    borderRadius: s(50),
  },
  restoreInner: { justifyContent: 'center', alignItems: 'center', padding: s(12) },
  ph: { paddingVertical: 8 },
});
