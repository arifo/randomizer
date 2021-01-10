import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  useColorScheme,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';

import { useSelector } from 'react-redux';

import { useAction } from 'hooks/useAction';
import {
  setAutoGenerate,
  setDelay,
  setMaxNumber,
  setMinNumber,
  setNumbersCount,
  setPressToStart,
  setShakeToStart,
  setUniqueOnly,
  // setDefaultSettings,
} from 'modules/numberSettings/actions';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { isNumber } from 'utils/strings';
import { ButtonBase } from 'views/components/Buttons';
import { FullscreenModal } from 'views/components/FullscreenModal';
import { Text } from 'views/components/Text';

const SettingsItem: React.FC<{ label: string }> = ({ label, children }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [hintVisible, showHint] = useState(false);

  const toggleHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showHint(!hintVisible);
  };

  const hideHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    showHint(false);
  };

  const borderColor = isDarkMode ? '#343a40' : '#ced4da';

  return (
    <View style={[styles.settingItem, { borderBottomColor: borderColor }]}>
      <View style={styles.settingButtonWrapper}>
        <ButtonBase
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

type InputSettingProps = {
  label: string;
  value: string | number;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  onChange: (value: number) => void;
};

const SettingInput = ({ label, value, onBlur, onSubmitEditing, onChange }: InputSettingProps) => {
  const isDarkMode = useColorScheme() === 'dark';

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

type SwitchSettingProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};
export const SettingSwitch = ({ label, value, onChange }: SwitchSettingProps) => {
  return (
    <SettingsItem label={label}>
      <Switch value={value} onValueChange={onChange} />
    </SettingsItem>
  );
};

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

export const NumberSettings = ({ visible, onClose }: SettingsProps) => {
  const setMin = useAction(setMinNumber);
  const setMax = useAction(setMaxNumber);
  const setCount = useAction(setNumbersCount);
  const setAuto = useAction(setAutoGenerate);
  const setNumDelay = useAction(setDelay);
  const setUnique = useAction(setUniqueOnly);
  const setPressStart = useAction(setPressToStart);
  const setShakeStart = useAction(setShakeToStart);
  // const restoreDefault = useAction(setDefaultSettings);

  const {
    minNum,
    maxNum,
    count,
    delay,
    autoGenerate,
    uniqueOnly,
    pressToStart,
    shakeToStart,
  } = useSelector((state: RootState) => state.numberSettings);

  const handleClose = () => {
    if (!minNum) {
      setMin(0);
    }
    if (!maxNum) {
      setMax(Number(minNum) + 1);
    }
    if (!count) {
      setCount(1);
    }
    if (!delay) {
      setNumDelay(1);
    }
    if (delay > 10) {
      setNumDelay(10);
    }
    if (minNum >= maxNum) {
      setMin(0);
    }
    onClose();
  };

  return (
    <FullscreenModal visible={visible} onClose={handleClose} title="Generator settings">
      <SettingInput
        label="Minimum number"
        value={minNum}
        onChange={setMin}
        onBlur={() => {
          setMin(Math.min(Math.max(minNum, 0), maxNum - 1));
          // Alert.alert('', 'Minimum value cannot be greater then maximum value');
        }}
        onSubmitEditing={() => {
          setMin(Math.min(Math.max(minNum, 0), maxNum - 1));
          // Alert.alert('', 'Minimum value cannot be greater then maximum value');
        }}
      />
      <SettingInput
        label="Maximum number"
        value={maxNum}
        onChange={setMax}
        onBlur={() => {
          setMax(Math.max(maxNum, minNum + 1));
          // Alert.alert('', 'Maximum value cannot be less or equal the minimum value');
        }}
        onSubmitEditing={() => {
          setMax(Math.max(maxNum, minNum + 1));
          // Alert.alert('', 'Maximum value cannot be less or equal the minimum value');
        }}
      />
      <SettingInput
        label="Numbers count"
        value={count}
        onChange={setCount}
        onBlur={() => {
          setCount(Math.max(Math.min(maxNum, count), 1));
        }}
        onSubmitEditing={() => {
          setCount(Math.max(Math.min(maxNum, count), 1));
        }}
      />
      <SettingInput
        label="Next number delay"
        value={delay}
        onChange={setNumDelay}
        onBlur={() => {
          setNumDelay(Math.max(Math.min(delay, 10), 1));
        }}
        onSubmitEditing={() => {
          setNumDelay(Math.max(Math.min(delay, 10), 1));
        }}
      />
      <SettingSwitch label="Auto generate" value={autoGenerate} onChange={setAuto} />
      <SettingSwitch label="Unique numbers" value={uniqueOnly} onChange={setUnique} />
      <SettingSwitch label="Press to start" value={pressToStart} onChange={setPressStart} />
      <SettingSwitch label="Shake to start" value={shakeToStart} onChange={setShakeStart} />

      {/* <ButtonBase
        onPress={restoreDefault}
        style={styles.restoreBtn}
        innerStyle={styles.restoreInner}>
        <Text size={16}>Restore default settings</Text>
      </ButtonBase> */}
      <View style={styles.spacer} />
    </FullscreenModal>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
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

  input: {
    fontSize: s(17),
    textAlign: 'center',
    flex: 1,
    width: '100%',
  },

  spacer: { height: 25 },
});
