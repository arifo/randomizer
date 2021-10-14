/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListType } from 'modules/lists/types';
import { isAndroid } from 'utils/platforms';
import { s } from 'utils/scaler';
import { uniqueId } from 'utils/strings';

import { useAppTheme } from 'views/contexts/useAppTheme';

import { Prompt } from '../Alerts';
import { IconButton } from '../Buttons';
import Header from '../Header';
import { Text } from '../Text';

import { InputField } from './InputField';
import { List } from './List';

interface ListEditorProps {
  visible: boolean;
  onClose: () => void;
  list?: ListType;
  defaultListName?: string;
  onSave: (list: ListType) => void;
}

export const ListEditor = ({
  list,
  defaultListName = 'List',
  onSave,
  visible,
  onClose,
}: ListEditorProps) => {
  const listRef = useRef<FlatList<string> | null>();
  const { isDarkMode } = useAppTheme();

  const [listTitle, setListTitle] = useState(list?.title || defaultListName || '');
  const [items, setItems] = useState<string[]>(list?.items || []);
  const [itemName, setItemName] = useState('');

  const [promptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    if (list) {
      setItems(list.items);
    }
    if (defaultListName) {
      setListTitle(defaultListName);
    }
  }, [list, defaultListName]);

  const handleAddItem = () => {
    if (!itemName) {
      setItems(prev => [`Item ${items.length + 1}`, ...prev]);
    } else {
      setItems(prev => [itemName, ...prev]);
      setItemName('');
    }
    if (listRef.current) {
      listRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const handleItemChange = (t: string, index: number) => {
    const nItems = items.slice();
    nItems[index] = t;
    setItems(nItems);
  };

  const handleItemRemove = (index: number) => {
    const nItems = items.slice();
    nItems.splice(index, 1);
    setItems(nItems);
  };

  const showPrompt = () => {
    setListTitle(listTitle);
    setPromptVisible(true);
  };
  const hidePrompt = () => {
    setPromptVisible(false);
  };

  const handleSave = () => {
    onSave({
      items,
      title: listTitle,
      id: list?.id || uniqueId(),
    });
    onClose();
    setItemName('');
    setItems([]);
    setPromptVisible(false);
  };

  const handleDiscard = () => {
    onClose();
    setItemName('');
    setItems([]);
  };

  const backgroundColor = isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(241, 250, 238,0.98)';

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={isAndroid}
      visible={visible}
      onRequestClose={handleDiscard}>
      <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor }]}>
        <View style={[styles.container, { backgroundColor }]}>
          <Header
            withBack={false}
            left={
              <TouchableOpacity onPress={handleDiscard}>
                <Text size={16}>Discard</Text>
              </TouchableOpacity>
            }
            center={<Text style={styles.headerTitle}>{list?.title || 'New list'}</Text>}
            right={
              <TouchableOpacity disabled={!items.length} onPress={showPrompt}>
                <Text size={16} style={{ opacity: !items.length ? 0.5 : 1 }}>
                  Save
                </Text>
              </TouchableOpacity>
            }
            sidesFlex={1}
          />

          <List
            listRef={el => {
              listRef.current = el;
            }}
            data={items}
            onItemInput={handleItemChange}
            onItemBackspace={handleItemRemove}
          />
        </View>

        <InputField
          value={itemName}
          onChangeText={setItemName}
          actionButton={<IconButton name="plusCircle" onPress={handleAddItem} />}
        />
      </SafeAreaView>
      <Prompt
        title={'List title'}
        visible={promptVisible}
        value={listTitle}
        onChangeText={setListTitle}
        noPress={hidePrompt}
        yesPress={handleSave}
        yesText="Save"
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: s(15) },
  headerTitle: { fontWeight: 'bold', fontSize: s(18) },
});
