import React, { useEffect, useState } from 'react';

import Slider from '@react-native-community/slider';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { FullscreenModal } from '@components/FullscreenModal';
import { Text } from '@components/Text';
import { useAction } from 'hooks/useAction';
import { setDiceCount, setPressToStart, setShakeToStart } from 'modules/diceSettings/actions';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { SettingSwitch } from '../Number/Settings';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

export const DiceSettings = ({ visible, onClose }: SettingsProps) => {
  const { isDarkMode } = useAppTheme();
  const setCountAction = useAction(setDiceCount);
  const setPressStart = useAction(setPressToStart);
  const setShakeStart = useAction(setShakeToStart);

  const { diceCount, pressToStart, shakeToStart } = useSelector(
    (state: RootState) => state.diceSettings,
  );

  const [count, setCount] = useState(diceCount);

  useEffect(() => {
    if (visible) {
      setCount(diceCount);
    }
  }, [visible]);

  const borderColor = isDarkMode ? '#343a40' : '#ced4da';

  const onCountChange = (val: number) => {
    setCount(val);
    setCountAction(val);
  };

  return (
    <FullscreenModal visible={visible} onClose={onClose} title="Dice settings">
      <View style={[styles.settingItem, { borderBottomColor: borderColor }]}>
        <View style={styles.row}>
          <Text size={18}>Dice count</Text>
          <View style={[styles.settingRight, { backgroundColor: borderColor }]}>
            <Text size={17}>{diceCount}</Text>
          </View>
        </View>
        <View style={styles.sliderWrapper}>
          <Text size={14}>1</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={6}
            step={1}
            value={count}
            onValueChange={onCountChange}
            minimumTrackTintColor={'blue'}
            maximumTrackTintColor={'grey'}
          />
          <Text size={14}>6</Text>
        </View>
      </View>
      <SettingSwitch label="Press to start" value={pressToStart} onChange={setPressStart} />
      <SettingSwitch label="Shake to start" value={shakeToStart} onChange={setShakeStart} />
    </FullscreenModal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderWrapper: { height: s(60), flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
  slider: { flex: 1, marginHorizontal: 15 },
  settingItem: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  settingLeft: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 3,
  },
  settingRight: {
    height: s(50),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 3,
  },
});
