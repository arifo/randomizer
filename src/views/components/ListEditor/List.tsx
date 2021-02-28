import React, { useRef } from 'react';

import { View, FlatList, StyleSheet } from 'react-native';

import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { Text } from '../Text';

import { Input } from './Input';

interface ListProps {
  data: string[];
  onItemInput: (t: string, index: number) => void;
  onItemBackspace: (index: number) => void;
  listRef: (el: FlatList<string> | null) => void;
}

export const List = ({ data, listRef, onItemInput, onItemBackspace }: ListProps) => {
  const { isDarkMode } = useAppTheme();
  const backgroundColor = isDarkMode ? '#212529' : '#e9ecef';

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <Input
        value={item}
        onChangeText={(t: string) => {
          onItemInput(t, index);
        }}
        onKeyPress={({ nativeEvent: { key } }) => {
          if (key === 'Backspace' && !item) {
            onItemBackspace(index);
          }
        }}
      />
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text size={14}>List empty!</Text>
    </View>
  );

  return (
    <FlatList
      ref={el => {
        listRef(el);
      }}
      data={data}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={styles.listContent}
      style={[styles.listStyle, { backgroundColor }]}
      removeClippedSubviews={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={renderEmpty}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  //flatlist
  listStyle: {
    marginBottom: s(20),
    borderRadius: s(25),
  },
  listContent: {
    paddingHorizontal: s(25),
    paddingVertical: s(15),
    minHeight: s(200),
    alignItems: 'center',
  },
  separator: { height: s(10) },
  emptyList: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
