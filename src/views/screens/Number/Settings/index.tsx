import React, { useCallback } from 'react';

import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
import { FullscreenModal } from 'views/components/FullscreenModal';

import { SettingInput } from './Input';
import { SettingsSwitch } from './Switch';

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
}

export const NumberSettings = ({ visible, onClose }: SettingsProps) => {
  const dispatch = useDispatch();

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

  const setMin = useCallback(
    (num: number) => {
      dispatch(setMinNumber(num));
    },
    [dispatch],
  );

  const setMax = useCallback(
    (num: number) => {
      dispatch(setMaxNumber(num));
    },
    [dispatch],
  );

  const setCount = useCallback(
    (num: number) => {
      dispatch(setNumbersCount(num));
    },
    [dispatch],
  );

  const setAuto = useCallback(
    (val: boolean) => {
      dispatch(setAutoGenerate(val));
    },
    [dispatch],
  );

  const setUnique = useCallback(
    (val: boolean) => {
      dispatch(setUniqueOnly(val));
    },
    [dispatch],
  );

  const setNumDelay = useCallback(
    (num: number) => {
      dispatch(setDelay(num));
    },
    [dispatch],
  );

  const setPressStart = useCallback(
    (val: boolean) => {
      dispatch(setPressToStart(val));
    },
    [dispatch],
  );

  const setShakeStart = useCallback(
    (val: boolean) => {
      dispatch(setShakeToStart(val));
    },
    [dispatch],
  );

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
      <SettingsSwitch label="Auto generate" value={autoGenerate} onChange={setAuto} />
      <SettingsSwitch label="Unique numbers" value={uniqueOnly} onChange={setUnique} />
      <SettingsSwitch label="Press to start" value={pressToStart} onChange={setPressStart} />
      <SettingsSwitch label="Shake to start" value={shakeToStart} onChange={setShakeStart} />

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
  spacer: { height: 25 },
});
