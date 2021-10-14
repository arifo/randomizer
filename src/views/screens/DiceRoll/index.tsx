import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Vibration, Animated } from 'react-native';
import RNShake from 'react-native-shake';
import { useSelector } from 'react-redux';

import { useDebounceCallback } from 'hooks/useDebounce';
import { getRandomNum } from 'randomizer';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { IconButton, StartButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { Text } from 'views/components/Text';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { Dice } from './Dice';
import { DiceSettings } from './Settings';

const DiceColors = ['#087e8b', '#f25f5c', '#ffbd00', '#55a630', '#5f0f40', '#0b3954'];

const DiceRollScreen = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const {
    themeColors: { backgroundColor },
  } = useAppTheme();

  const [settingsVisible, showSettings] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const { diceCount, pressToStart, shakeToStart } = useSelector(
    (state: RootState) => state.diceSettings,
  );

  const [diceValues, setDiceValues] = useState<number[]>(Array(diceCount).fill(6));

  const transY = useRef(new Animated.Value(0)).current;
  const transX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setDiceValues(Array(diceCount).fill(6));
  }, [diceCount]);

  const openSettings = useCallback(() => {
    showSettings(true);
  }, []);
  const closeSettings = useCallback(() => {
    showSettings(false);
  }, []);

  const startShake = useCallback(
    (onFinishCb: () => void) => {
      const dir = getRandomNum(0, 1);
      const value = getRandomNum(15, 25) * (dir > 0 ? 1 : -1);
      const dur = getRandomNum(75, 100);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(transY, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transY, { toValue: 0, duration: dur, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(transX, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: -value, duration: dur, useNativeDriver: true }),
          Animated.timing(transX, { toValue: 0, duration: dur, useNativeDriver: true }),
        ]),
      ]).start(({ finished }) => {
        if (finished) {
          onFinishCb();
        }
      });
    },
    [transX, transY],
  );

  const rollOnce = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      setWaiting(true);
      startShake(() => {
        const diceNums = diceValues.map(() => getRandomNum(1, 6));

        setDiceValues(diceNums);
        Vibration.vibrate(50);
        setWaiting(false);
      });
    }, [waiting, startShake, diceValues]),
    100,
  );

  useFocusEffect(
    useCallback(() => {
      RNShake.addEventListener('ShakeEvent', () => {
        if (shakeToStart) {
          rollOnce();
        }
      });
      return () => {
        RNShake.removeEventListener('ShakeEvent');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [rollOnce, shakeToStart]),
  );

  const diceData = diceValues.map((value, index) => {
    return {
      value,
      color: DiceColors[index],
    };
  });
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title={'Dice roll'} right={<IconButton name="edit" onPress={openSettings} />} />

      <View style={styles.content}>
        <View style={styles.diceWrapper}>
          {diceData.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                styles.animdice,
                { transform: [{ translateX: transX }, { translateY: transY }] },
              ]}>
              <Dice loading={waiting} color={item.color} value={item.value} />
            </Animated.View>
          ))}
        </View>
      </View>
      <View style={styles.result}>
        <Text size={18} color="white">
          {diceValues.reduce((acc, cur) => acc + cur, 0)}
        </Text>
      </View>
      <View style={styles.footer}>
        {pressToStart && (
          <StartButton disabled={waiting} text={waiting ? 'Rolling' : 'Roll'} onPress={rollOnce} />
        )}
      </View>
      <Text style={styles.autoMt}>Press "Roll" or Shake to randomize</Text>

      <DiceSettings visible={settingsVisible} onClose={closeSettings} />
    </View>
  );
};

export default DiceRollScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  diceWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  animdice: { margin: 20 },
  result: {
    alignSelf: 'center',
    backgroundColor: '#335c67',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    flex: 0.75,
  },
  autoMt: { bottom: s(20), position: 'absolute', textAlign: 'center', alignSelf: 'center' },
});
