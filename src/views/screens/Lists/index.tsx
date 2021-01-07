import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet, useColorScheme, FlatList } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { useSelector } from 'react-redux';

import { useAction } from 'hooks/useAction';
import { listSortAction } from 'modules/lists/actions';
import { theme } from 'theme';
import { RootState } from 'types';
import { s } from 'utils/scaler';

import { IconButton } from 'views/components/Buttons';

import { Container } from 'views/components/Container';
import Header from 'views/components/Header';

import { Text } from 'views/components/Text';

import { NewList } from './NewList';

const ListsScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const backgroundColor = themeColors.backgroundColor;

  const sortList = useAction(listSortAction);

  const { lists } = useSelector((state: RootState) => state.lists);

  const [visible, setVisible] = useState(false);

  const showNewList = () => {
    setVisible(true);
  };
  const hideNewList = () => {
    setVisible(false);
  };
  const borderColor = isDarkMode ? '#343a40' : '#ced4da';
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title="Lists" right={<IconButton icon="plus-circle" onPress={showNewList} />} />
      <DraggableFlatList
        data={lists}
        onDragEnd={({ data }) => sortList(data)}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingVertical: s(20), paddingHorizontal: s(15) }}
        ItemSeparatorComponent={() => <View style={{ height: s(20) }} />}
        renderItem={({ item, index, drag, isActive }) => {
          return (
            <TouchableOpacity
              onLongPress={drag}
              onPress={() => navigation.navigate('ListRandomizer', { id: item.id })}>
              <View
                style={[
                  styles.card,
                  { borderColor, backgroundColor: isDarkMode ? '#212529' : '#dee2e6' },
                ]}>
                <Text size={15} style={{ fontWeight: 'bold' }}>
                  {item.title}
                </Text>
                <View style={[styles.separator, { backgroundColor: borderColor }]} />
                <Text
                  numberOfLines={1}
                  style={{ opacity: 0.5, fontStyle: 'italic' }}>{`${item.items.join(', ')}`}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <NewList visible={visible} onClose={hideNewList} />
    </View>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 15,
    backgroundColor: 'grey',
    borderRadius: 15,
    borderWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  separator: {
    height: 1,
    marginTop: 8,
    marginBottom: 12,
  },
});
