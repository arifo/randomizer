import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Dimensions, Vibration } from 'react-native';
import RNShake from 'react-native-shake';

import { useDebounceCallback } from 'hooks/useDebounce';
import { getRandomNum } from 'randomizer';

import { s } from 'utils/scaler';

import { StartButton } from 'views/components/Buttons';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { Pad } from 'views/components/Pad';

import { Text } from 'views/components/Text';

import { Alphabet } from './data';

const { height } = Dimensions.get('window');

const padH = height * 0.35;

const LetterScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
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

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollToEnd();
  }, [letters, waiting]);

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
      }, 2 * 1000);
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
      <Pad height={padH} loading={waiting}>
        <Text adjustsFontSizeToFit numberOfLines={1} size={250}>
          {waiting ? '' : letters[letters.length - 1]}
        </Text>
      </Pad>
      <View style={styles.status}>
        <Text>
          {letters.length}/{Alphabet.en.length}
        </Text>
        <ScrollView ref={scrollRef} horizontal style={{ marginTop: s(15) }}>
          {letters.map((num, index) => (
            <View key={index} style={[styles.ranNumView, { marginLeft: !index ? 0 : 5 }]}>
              <Text size={14} color="white">
                {num}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default LetterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: s(20) },

  ranNumView: {
    alignSelf: 'flex-start',
    paddingHorizontal: s(10),
    paddingVertical: s(5),
    borderRadius: 5,
    backgroundColor: '#335c67',
    marginBottom: 10,
  },

  status: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: s(30),
  },

  autoMt: { marginTop: 'auto' },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 25,
    flex: 0.6,
    justifyContent: 'space-between',
  },
});
