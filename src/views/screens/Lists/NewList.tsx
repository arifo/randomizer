import React, { useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  useColorScheme,
  FlatList,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';

import { ButtonBase, IconButton } from '@components/Buttons';
import Header from '@components/Header';
import { List, InputField } from '@components/List';
import { Text } from '@components/Text';

import { useAction } from 'hooks/useAction';
import { listAddAction } from 'modules/lists/actions';
import { RootState } from 'types';
import { isAndroid } from 'utils/platforms';
import { s } from 'utils/scaler';
import { uniqueId } from 'utils/strings';
import { Prompt } from 'views/components/Prompt';

interface NewListProps {
  visible: boolean;
  onClose: () => void;
}

export const NewList = ({ visible, onClose }: NewListProps) => {
  const listRef = useRef<FlatList<string> | null>();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(241, 250, 238,0.98)';

  const save = useAction(listAddAction);

  const [items, setItems] = useState<string[]>([]);
  const [itemName, setItemName] = useState('');

  const { lists } = useSelector((state: RootState) => state.lists);

  const [promptVisible, setPromptVisible] = useState(false);
  const [listTitle, setListTitle] = useState(`List ${lists.length + 1}`);

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
    setItems(prevs => {
      prevs[index] = t;
      return [...prevs];
    });
  };

  const handleItemRemove = (index: number) => {
    setItems(prevs => {
      prevs.splice(index, 1);
      return [...prevs];
    });
  };

  const showPrompt = () => {
    setListTitle(`List ${lists.length + 1}`);
    setPromptVisible(true);
  };
  const hidePrompt = () => {
    setPromptVisible(false);
  };

  const handleSave = () => {
    save({
      items,
      title: listTitle,
      id: uniqueId(),
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

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={isAndroid}
      visible={visible}
      onRequestClose={handleDiscard}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={[styles.container, { backgroundColor }]}>
          <Header
            withBack={false}
            left={
              <TouchableOpacity onPress={handleDiscard}>
                <Text size={16}>Discard</Text>
              </TouchableOpacity>
            }
            center={<Text style={styles.headerTitle}>New list</Text>}
            right={
              <TouchableOpacity disabled={!items.length} onPress={showPrompt}>
                <Text size={16} style={{ opacity: !items.length ? 0.5 : 1 }}>
                  Save
                </Text>
              </TouchableOpacity>
            }
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
          actionButton={<IconButton icon="plus-circle" onPress={handleAddItem} />}
        />
      </SafeAreaView>
      <Prompt
        visible={promptVisible}
        value={listTitle}
        onChangeText={setListTitle}
        noPress={hidePrompt}
        yesPress={handleSave}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: s(15) },
  headerTitle: { fontWeight: 'bold', fontSize: s(18) },
});
