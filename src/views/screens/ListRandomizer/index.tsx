import React from 'react';

import { useRoute } from '@react-navigation/native';

import { View, StyleSheet, FlatList, useColorScheme, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { theme } from 'theme';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { IconButton, StartButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { Text } from 'views/components/Text';

const { width: wWidth } = Dimensions.get('window');

const ListRandomizer = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const backgroundColor = themeColors.backgroundColor;

  const route = useRoute();
  const { id } = route.params;
  const { lists } = useSelector((state: RootState) => state.lists);

  const list = lists.find(i => i.id === id);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title={list?.id ? list.title : 'List randomizer'} />
      <FlatList
        data={list?.items || []}
        keyExtractor={(_, i) => i.toString()}
        ItemSeparatorComponent={() => <View style={{ height: s(10) }} />}
        contentContainerStyle={{ paddingTop: s(20), paddingBottom: s(280) }}
        renderItem={({ item, index }) => {
          let backgroundColor = isDarkMode
            ? `rgba(33, 37, 41,${index % 2 === 0 ? 0.5 : 1})`
            : `rgba(222, 226, 230, ${index % 2 === 0 ? 1 : 0.5})`;

          return (
            <View
              style={{
                marginHorizontal: s(15),
                alignItems: 'center',
                padding: s(10),
                borderRadius: s(10),
                backgroundColor,
              }}>
              <Text size={18}>{item}</Text>
            </View>
          );
        }}
      />
      <View
        pointerEvents="box-none"
        style={{
          alignItems: 'center',
          paddingTop: 30,
          paddingBottom: 30,
          bottom: 0,
          position: 'absolute',
          width: wWidth,
        }}>
        <View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: isDarkMode ? 'rgba(1, 12, 20,0.7)' : 'rgba(247, 249, 240,0.7)',
            width: '100%',
            borderTopRightRadius: wWidth * 0.5,
            borderTopLeftRadius: wWidth * 0.5,
          }}
        />
        <StartButton text={'Start'} />
      </View>
    </View>
  );
};

export default ListRandomizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: { marginBottom: s(20), alignItems: 'center' },
  fieldTitle: { marginBottom: 8 },
  input: {
    textAlign: 'center',
    height: s(45),
    minWidth: '35%',
    paddingHorizontal: 10,
    fontSize: s(18),
    borderRadius: 10,
  },
});
