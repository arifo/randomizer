import React, { useCallback, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Vibration } from 'react-native';
import RNShake from 'react-native-shake';

import { StartButton } from '@components/Buttons';
import { Container } from '@components/Container';
import Header from '@components/Header';
import { Pad } from '@components/Pad';
import { RolledItems } from '@components/RolledItems';
import { Text } from '@components/Text';
import { useDebounceCallback } from 'hooks/useDebounce';
import { getRandomNum } from 'randomizer';
import { s } from 'utils/scaler';

import { Alphabet } from './data';

const { height } = Dimensions.get('window');

const padH = height * 0.35;

const LetterScreen = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useFocusEffect(
    useCallback(() => {
      RNShake.addEventListener('ShakeEvent', () => {
        rollOnce();
      });
      return () => {
        RNShake.removeEventListener('ShakeEvent');

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []),
  );

  const generateLetter = () => {
    const index = getRandomNum(0, Alphabet.en.length - 1);
    let letter = Alphabet.en[index];

    if (letters.includes(letter)) {
      while (letters.includes(letter)) {
        const newIndex = getRandomNum(0, Alphabet.en.length - 1);
        letter = Alphabet.en[newIndex];
      }
    }
    return letter;
  };

  const onEndReached = () => {
    Vibration.vibrate(100);
    setLetters([]);
  };

  const rollOnce = useDebounceCallback(
    useCallback(() => {
      if (waiting) {
        return;
      }

      if (letters.length === Alphabet.en.length) {
        onEndReached();
        return;
      }

      setWaiting(true);
      timeoutRef.current = setTimeout(() => {
        const nextLetter = generateLetter();
        setLetters(prevState => [...prevState, nextLetter]);
        Vibration.vibrate(50);
        setWaiting(false);
      }, 1 * 1000);
    }, [waiting, letters]),
    100,
  );

  return (
    <Container
      style={styles.container}
      Header={<Header withSafeArea={false} title="Random letter" />}
      Footer={
        <View style={styles.footer}>
          <StartButton
            text={
              letters.length > 0
                ? letters.length === Alphabet.en.length
                  ? 'Reset'
                  : 'Next'
                : 'Start'
            }
            onPress={rollOnce}
          />
          <Text style={styles.autoMt}>Press Start or Shake to randomize</Text>
        </View>
      }>
      <Pad
        height={padH}
        loading={waiting}
        placeholder="Press Start or Shake to randomize"
        content={letters[letters.length - 1]}
        progress={`${letters.length}/${Alphabet.en.length}`}
      />

      <RolledItems data={letters} showAllDone={letters.length === Alphabet.en.length} />
    </Container>
  );
};

export default LetterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: s(20) },

  autoMt: { marginTop: 'auto' },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 25,
    flex: 0.6,
    justifyContent: 'space-between',
  },
});
