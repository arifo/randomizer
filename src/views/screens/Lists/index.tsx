import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { useSelector } from 'react-redux';

import { Alert } from '@components/Alerts';
import { IconButton, FloatingButton } from '@components/Buttons';
import Header from '@components/Header';
import { ListEditor } from '@components/ListEditor';
import { Text } from '@components/Text';
import { useAction } from 'hooks/useAction';
import { listAddAction, listDeleteAction, listSortAction } from 'modules/lists/actions';
import { ListType } from 'modules/lists/types';

import { RootState } from 'types';
import { s } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

const ListsScreen = () => {
  const save = useAction(listAddAction);
  const deleteList = useAction(listDeleteAction);

  const navigation = useNavigation();

  const { isDarkMode, themeColors } = useAppTheme();

  const backgroundColor = themeColors.backgroundColor;

  const sortList = useAction(listSortAction);

  const { lists } = useSelector((state: RootState) => state.lists);

  const [modal, showModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<ListType>();

  const showNewList = () => {
    showModal(true);
  };
  const hideNewList = () => {
    showModal(false);
  };

  const showDeleteAlert = (item: ListType) => {
    setListToDelete(item);
  };
  const hideDeleteAlert = () => {
    setListToDelete(undefined);
  };

  const handleDelete = () => {
    if (listToDelete) {
      deleteList(listToDelete?.id);
    }
    setListToDelete(undefined);
  };

  const borderColor = isDarkMode ? '#343a40' : '#ced4da';

  const renderEmptyList = () => (
    <View style={styles.emptyList}>
      <Text size={18} style={styles.emptyTitle}>
        No list to randomize!
      </Text>
      <Text size={18} style={styles.emptyMessage}>
        Press "Plus" button to add one.
      </Text>
      <FloatingButton onPress={showNewList} position="relative" />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title="Lists" />
      <DraggableFlatList
        data={lists}
        onDragEnd={({ data }) => sortList(data)}
        keyExtractor={i => i.id}
        contentContainerStyle={[
          { paddingVertical: s(20), paddingHorizontal: s(15) },
          !lists.length && { flex: 1 },
        ]}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={() => <View style={{ height: s(20) }} />}
        renderItem={({ item, index, drag, isActive }) => {
          return (
            <TouchableOpacity
              onLongPress={drag}
              onPress={() => navigation.navigate('ListRandomizer', { id: item.id })}>
              <View
                style={[
                  styles.card,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    borderColor,
                    shadowColor: themeColors.shadowColor,
                    backgroundColor: isDarkMode ? '#212529' : '#dee2e6',
                  },
                ]}>
                <View style={styles.cardTop}>
                  <Text numberOfLines={3} size={15} style={styles.cardTitle}>
                    {item.title}
                  </Text>

                  <View style={styles.cardAction}>
                    <IconButton
                      icon="delete"
                      onPress={() => showDeleteAlert(item)}
                      style={styles.deleteButton}
                    />
                  </View>
                </View>
                <View style={[styles.separator, { backgroundColor: borderColor }]} />
                <Text numberOfLines={1} style={styles.cardContent}>{`${item.items.join(
                  ', ',
                )}`}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {lists.length > 0 && <FloatingButton onPress={showNewList} />}
      <Alert
        visible={!!listToDelete}
        title={`Delete "${listToDelete?.title}"?`}
        noText="No"
        noPress={hideDeleteAlert}
        yesPress={handleDelete}
        yesText="Delete"
      />
      <ListEditor
        visible={modal}
        onClose={hideNewList}
        onSave={save}
        defaultListName={`List ${lists.length + 1}`}
      />
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
    elevation: 3,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardAction: { width: 30, height: 20, marginLeft: 5 },
  deleteButton: { position: 'absolute', right: 0 },
  cardTitle: { fontWeight: 'bold', flex: 1 },
  cardContent: { opacity: 0.5, fontStyle: 'italic' },
  separator: {
    height: 1,
    marginTop: 8,
    marginBottom: 12,
  },

  emptyList: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 150 },
  emptyTitle: { textAlign: 'center', marginBottom: 5 },
  emptyMessage: { textAlign: 'center', marginBottom: 25 },
});
