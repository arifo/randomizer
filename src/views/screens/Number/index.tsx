import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, UIManager, ScrollView, Vibration } from 'react-native';
import { Fold, Wander } from 'react-native-animated-spinkit';
import RNShake from 'react-native-shake';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

import { IconButton, StartButton } from '@components/Buttons';
import { Container } from '@components/Container';
import Header from '@components/Header';
import { Pad } from '@components/Pad';
import { Text } from '@components/Text';
import { useAction } from 'hooks/useAction';
import { useDebounceCallback } from 'hooks/useDebounce';
import { saveNumberHistory } from 'modules/history/actions';

import { getRandomNum } from 'randomizer';
import { RootState } from 'types';
import { isAndroid } from 'utils/platforms';
import { s } from 'utils/scaler';
import { pluralize } from 'utils/strings';

import { NumberSettings } from './Settings';

if (isAndroid) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');

const numPadH = width * 0.6;

const NumberScreen = () => {
  const scrollRef = useRef<ScrollView>(null);

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
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollToEnd();
    if (hasEnded) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setWaiting(false);
      return;
    }
  }, [randomNums]);

  const onEndReached = () => {
    Vibration.vibrate(100);
    Toast.show({
      text1: 'Saved to history',
      type: 'success',
      visibilityTime: 1000,
      topOffset: 50,
    });
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

      Toast.hide();

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
    }, [waiting, count, randomNums, delay]),
    100,
  );

  const autoRoll = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      Toast.hide();
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
    }, [waiting, count, randomNums, delay]),
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

  const Loader = autoGenerate ? Wander : Fold;

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
        }
        Footer={
          <View style={styles.footer}>
            {pressToStart && (
              <StartButton disabled={waiting} text={buttonText} onPress={handleStart} />
            )}
            {randomNums.length > 0 && <Text style={styles.autoMt}>{getHintText(buttonText)}</Text>}
          </View>
        }>
        <Pad
          loading={waiting}
          Loader={<Loader size={autoGenerate ? numPadH : numPadH * 0.6} color={'blue'} />}>
          {randomNums.length > 0 && (
            <Text adjustsFontSizeToFit numberOfLines={1} size={100}>
              {randomNums[randomNums.length - 1]}
            </Text>
          )}
          {!randomNums.length && !waiting && (
            <Text adjustsFontSizeToFit numberOfLines={1} size={18}>
              {getHintText()}
            </Text>
          )}
          <Text style={{ position: 'absolute', bottom: 5 }}>
            {`Min: ${minNum}    Max: ${maxNum}`}
          </Text>
        </Pad>

        <View style={styles.status}>
          <Text>
            {randomNums.length}/{uniqueOnly ? Math.min(count, maxNum - minNum + 1) : count}
          </Text>
          <ScrollView ref={scrollRef} horizontal style={{ marginTop: s(15) }}>
            {randomNums.map((num, index) => (
              <View key={index} style={[styles.ranNumView, { marginLeft: !index ? 0 : 5 }]}>
                <Text size={14} color="white">
                  {num}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Container>

      <NumberSettings visible={settingsVisible} onClose={closeSettings} />
    </>
  );
};

export default NumberScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: s(20) },

  status: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: s(30),
  },

  ranNumView: {
    alignSelf: 'flex-start',
    paddingHorizontal: s(10),
    paddingVertical: s(5),
    borderRadius: 5,
    backgroundColor: '#335c67',
    marginBottom: 10,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 25,
    flex: 0.7,
    justifyContent: 'space-between',
  },
  autoMt: { marginTop: 'auto' },
});
