import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, UIManager, Vibration } from 'react-native';
import RNShake from 'react-native-shake';
// import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import { IconButton, StartButton } from '@components/Buttons';
import { Container } from '@components/Container';
import Header from '@components/Header';
import { Pad } from '@components/Pad';
import { RolledItems } from '@components/RolledItems';
import { Text } from '@components/Text';
import { useAction } from 'hooks/useAction';
import { useDebounceCallback } from 'hooks/useDebounce';
import { saveNumberHistory } from 'modules/history/actions';

import { getRandomNum } from 'randomizer';
import { RootState } from 'types';
import { isAndroid } from 'utils/platforms';
import { s } from 'utils/scaler';

import { NumberSettings } from './Settings';

if (isAndroid) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

const numPadH = width * 0.7;

const NumberScreen = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();

  const saveToHistory = useAction(saveNumberHistory);

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

  const [settingsVisible, showSettings] = useState(false);
  const [randomNums, setRandomNum] = useState<number[]>([]);
  const [waiting, setWaiting] = useState(false);

  const hasEnded = (uniqueOnly ? Math.min(count, maxNum - minNum + 1) : count) <= randomNums.length;

  useFocusEffect(
    React.useCallback(() => {
      RNShake.addEventListener('ShakeEvent', () => {
        handleStart();
      });
      return () => {
        RNShake.removeEventListener('ShakeEvent');
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []),
  );

  useEffect(() => {
    if (hasEnded) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setWaiting(false);
      return;
    }
  }, [hasEnded]);

  const onEndReached = () => {
    Vibration.vibrate(100);
    // Toast.show({
    //   text1: 'Saved to history',
    //   type: 'success',
    //   visibilityTime: 1000,
    //   topOffset: 50,
    // });
    saveToHistory({
      randomNumbers: randomNums,
      min: minNum,
      max: maxNum,
      count,
      date: new Date(),
    });
    setRandomNum([]);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const generateNumber = () => {
    let num = getRandomNum(minNum, maxNum);
    if (uniqueOnly && randomNums.includes(num)) {
      while (randomNums.includes(num)) {
        num = getRandomNum(minNum, maxNum);
      }
    }
    return num;
  };

  const rollOnce = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      // Toast.hide();

      if (hasEnded) {
        onEndReached();
        return;
      }

      setWaiting(true);
      timeoutRef.current = setTimeout(() => {
        const nextNumber = generateNumber();
        setRandomNum(prevState => [...prevState, nextNumber]);
        Vibration.vibrate(50);
        setWaiting(false);
      }, delay * 1000);
    }, [waiting, count, minNum, maxNum, randomNums, delay]),
    100,
  );

  const autoRoll = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      // Toast.hide();

      if (hasEnded) {
        onEndReached();
        return;
      }
      setWaiting(true);

      timerRef.current = setInterval(() => {
        const nextNumber = generateNumber();
        setRandomNum(prevState => [...prevState, nextNumber]);
        Vibration.vibrate(50);
      }, delay * 1000);
    }, [waiting, count, minNum, maxNum, randomNums, delay]),
    100,
  );

  const handleStart = () => {
    if (autoGenerate) {
      autoRoll();
    } else {
      rollOnce();
    }
  };

  const getHintText = (btnTxt: string = 'Start') => {
    if (pressToStart && shakeToStart) {
      return `Press ${btnTxt} or Shake to randomize`;
    }
    if (!pressToStart && shakeToStart) {
      return 'Shake to randomize';
    }
    if (pressToStart && !shakeToStart) {
      return `Press ${btnTxt} to randomize`;
    }
    if (!pressToStart && !shakeToStart) {
      return 'Enable "Start" or "Shake" in the Settings';
    }
  };

  const openSettings = () => {
    showSettings(true);
  };
  const closeSettings = () => {
    showSettings(false);
  };

  const buttonText =
    randomNums.length > 0 ? (count <= randomNums.length ? 'Reset' : 'Next') : 'Start';

  return (
    <>
      <Container
        style={styles.container}
        Header={
          <Header
            withSafeArea={false}
            title="Number Generator"
            right={<IconButton icon="settings" onPress={openSettings} />}
          />
        }>
        <Pad
          loading={waiting}
          height={numPadH}
          placeholder={getHintText()}
          content={randomNums[randomNums.length - 1]}
          progress={`Min: ${minNum}          ${randomNums.length}/${
            uniqueOnly ? Math.min(count, maxNum - minNum + 1) : count
          }          Max: ${maxNum}`}
        />

        <RolledItems
          data={randomNums}
          showAllDone={uniqueOnly ? randomNums.length === count : false}
        />

        <View style={styles.footer}>
          {pressToStart && (
            <StartButton disabled={waiting} text={buttonText} onPress={handleStart} />
          )}
        </View>
        {randomNums.length > 0 && <Text style={styles.autoMt}>{getHintText(buttonText)}</Text>}
      </Container>

      <NumberSettings visible={settingsVisible} onClose={closeSettings} />
    </>
  );
};

export default NumberScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: s(20) },

  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    flex: 1,
  },
  autoMt: { bottom: s(20), position: 'absolute', textAlign: 'center', alignSelf: 'center' },
});
