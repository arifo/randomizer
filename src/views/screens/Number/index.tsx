import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, UIManager, Vibration } from 'react-native';
import RNShake from 'react-native-shake';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounceCallback } from 'hooks/useDebounce';
import { saveNumberHistory } from 'modules/history/actions';
import { getRandomNum } from 'randomizer';
import { RootState } from 'types';
import { isAndroid } from 'utils/platforms';
import { s } from 'utils/scaler';
import { IconButton, StartButton } from 'views/components/Buttons';
import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { Pad } from 'views/components/Pad';
import { RolledItems } from 'views/components/RolledItems';
import { Text } from 'views/components/Text';

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
  const timerRef = useRef<NodeJS.Timer>();
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

  const [settingsVisible, showSettings] = useState(false);
  const [randomNums, setRandomNum] = useState<number[]>([]);
  const [waiting, setWaiting] = useState(false);

  const hasEnded = (uniqueOnly ? Math.min(count, maxNum - minNum + 1) : count) <= randomNums.length;

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const onEndReached = useCallback(() => {
    Vibration.vibrate(100);

    const history = {
      count,
      randomNumbers: randomNums,
      min: minNum,
      max: maxNum,
      date: new Date(),
    };
    dispatch(saveNumberHistory(history));
    setRandomNum([]);
    clearTimers();
  }, [clearTimers, count, dispatch, maxNum, minNum, randomNums]);

  const generateNumber = useCallback(
    (numbers: number[]) => {
      let num = getRandomNum(minNum, maxNum);
      if (uniqueOnly && numbers.includes(num)) {
        while (numbers.includes(num)) {
          num = getRandomNum(minNum, maxNum);
        }
      }
      return num;
    },
    [maxNum, minNum, uniqueOnly],
  );

  const setNumbers = useCallback(() => {
    setRandomNum(prevState => {
      const nextNumber = generateNumber(prevState);
      return [...prevState, nextNumber];
    });

    Vibration.vibrate(50);
    setWaiting(false);
  }, [generateNumber]);

  const rollOnce = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      if (hasEnded) {
        onEndReached();
        return;
      }

      setWaiting(true);
      timeoutRef.current = setTimeout(setNumbers, delay * 1000);
    }, [waiting, hasEnded, setNumbers, delay, onEndReached]),
    100,
  );

  const autoRoll = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      if (hasEnded) {
        onEndReached();
        return;
      }

      setWaiting(true);
      timerRef.current = setInterval(setNumbers, delay * 1000);
    }, [waiting, hasEnded, setNumbers, delay, onEndReached]),
    100,
  );

  const handleStop = useCallback(() => {
    clearTimers();
    setWaiting(false);
  }, [clearTimers]);

  const handleStart = useCallback(() => {
    if (waiting) {
      handleStop();
      return;
    }
    if (autoGenerate) {
      autoRoll();
    } else {
      rollOnce();
    }
  }, [waiting, autoGenerate, handleStop, autoRoll, rollOnce]);

  useFocusEffect(
    useCallback(() => {
      RNShake.addEventListener('ShakeEvent', () => {
        if (shakeToStart) {
          handleStart();
        }
      });
      return () => {
        RNShake.removeEventListener('ShakeEvent');
      };
    }, [shakeToStart, handleStart]),
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

  const getButtonText = () => {
    if (waiting) {
      return autoGenerate ? 'Stop' : 'Rolling';
    }
    if (count === randomNums.length) {
      return 'Reset';
    }
    if (count > randomNums.length && randomNums.length > 0) {
      return 'Next';
    }

    return 'Start';
  };

  const openSettings = () => {
    showSettings(true);
  };
  const closeSettings = () => {
    showSettings(false);
  };

  const buttonText = getButtonText();

  return (
    <>
      <Container
        style={styles.container}
        Header={
          <Header
            withSafeArea={false}
            title="Number Generator"
            right={<IconButton name="settings" onPress={openSettings} />}
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
          {pressToStart && <StartButton text={buttonText} onPress={handleStart} />}
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
