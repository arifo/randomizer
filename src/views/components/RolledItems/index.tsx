/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import { s } from 'utils/scaler';

import { Text } from '../Text';

interface RolledItemsProps<T> {
  data: T[];
  showAllDone: boolean;
}

export const RolledItems = <T,>({ data = [], showAllDone }: RolledItemsProps<T>) => {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          contentContainerStyle={{ padding: s(15) }}
          onContentSizeChange={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollToEnd();
            }
          }}>
          {data.map((item, index) => (
            <View key={index} style={[styles.item, { marginLeft: !index ? 0 : 5 }]}>
              <Text size={14} color="white">
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {showAllDone && <Text size={13}>All possible variants are generated!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: s(20),
  },

  scrollContainer: { height: s(60) },

  item: {
    justifyContent: 'center',
    paddingHorizontal: s(10),
    paddingVertical: s(5),
    borderRadius: 5,
    backgroundColor: '#335c67',
  },
});
