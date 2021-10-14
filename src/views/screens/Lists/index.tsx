import React, { useCallback, useState } from 'react';

import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList, { DragEndParams } from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';

import { listAddAction, listDeleteAction, listSortAction } from 'modules/lists/actions';
import { ListType } from 'modules/lists/types';
import { RootStackComponent } from 'navigation/list';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { Alert } from 'views/components/Alerts';
import { IconButton, FloatingButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { ListEditor } from 'views/components/ListEditor';
import { Text } from 'views/components/Text';
import { useAppTheme } from 'views/contexts/useAppTheme';

const ListsScreen: RootStackComponent<'ListsScreen'> = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    isDarkMode,
    themeColors: { backgroundColor, shadowColor },
  } = useAppTheme();
  const { lists } = useSelector((state: RootState) => state.lists);

  const [modal, showModal] = useState(false);
  const [listToDelete, setListToDelete] = useState<ListType>();

  const showNewList = useCallback(() => {
    showModal(true);
  }, []);
  const hideNewList = useCallback(() => {
    showModal(false);
  }, []);

  const showDeleteAlert = useCallback((item: ListType) => {
    setListToDelete(item);
  }, []);
  const hideDeleteAlert = useCallback(() => {
    setListToDelete(undefined);
  }, []);

  const onDragEnd = useCallback(
    ({ data }: DragEndParams<ListType>) => {
      dispatch(listSortAction(data));
    },
    [dispatch],
  );

  const handleDelete = useCallback(() => {
    if (listToDelete) {
      dispatch(listDeleteAction(listToDelete.id));
    }
    setListToDelete(undefined);
  }, [listToDelete, dispatch]);

  const onSave = useCallback(
    (list: ListType) => {
      dispatch(listAddAction(list));
    },
    [dispatch],
  );

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

  const borderColor = isDarkMode ? '#343a40' : '#ced4da';
  const listItemStyles = [
    styles.card,
    {
      borderColor,
      shadowColor: shadowColor,
      backgroundColor: isDarkMode ? '#212529' : '#dee2e6',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title="Lists" />
      <DraggableFlatList
        data={lists}
        onDragEnd={onDragEnd}
        keyExtractor={i => i.id}
        contentContainerStyle={[styles.listPadding, !lists.length && styles.flex]}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={() => <View style={{ height: s(20) }} />}
        renderItem={({ item, drag }) => {
          return (
            <TouchableOpacity
              onLongPress={drag}
              onPress={() => navigation.navigate('ListRandomizer', { id: item.id })}>
              <View style={listItemStyles}>
                <View style={styles.cardTop}>
                  <Text numberOfLines={3} size={15} style={styles.cardTitle}>
                    {item.title}
                  </Text>

                  <View style={styles.cardAction}>
                    <IconButton
                      name="delete"
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
        onSave={onSave}
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
  listPadding: { paddingVertical: s(20), paddingHorizontal: s(15) },
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

  flex: { flex: 1 },
});
