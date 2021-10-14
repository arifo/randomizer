import React, { useCallback, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, FlatList, Dimensions, Vibration } from 'react-native';
import RNShake from 'react-native-shake';
import { useDispatch, useSelector } from 'react-redux';

import { useDebounceCallback } from 'hooks/useDebounce';
import { listEditAction } from 'modules/lists/actions';
import { ListType } from 'modules/lists/types';
import { RootStackComponent } from 'navigation/list';
import { getRandomNum } from 'randomizer';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { StartButton, IconButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { ListEditor } from 'views/components/ListEditor';
import { Pad } from 'views/components/Pad';
import { RolledItems } from 'views/components/RolledItems';
import { Text } from 'views/components/Text';
import { useAppTheme } from 'views/contexts/useAppTheme';

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const numPadH = wHeight * 0.35;

const ListRandomizer: RootStackComponent<'ListRandomizer'> = ({ route }) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const {
    isDarkMode,
    themeColors: { backgroundColor, shadowColor },
  } = useAppTheme();

  const { id } = route.params;
  const { lists } = useSelector((state: RootState) => state.lists);
  const list = lists.find(i => i.id === id);

  const [visible, setVisible] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [rolledItems, setRolledItems] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);

  const generateNext = useCallback(() => {
    if (list?.items) {
      const index = getRandomNum(0, list.items.length - 1);
      let item = list.items[index];

      if (rolledItems.includes(item)) {
        while (rolledItems.includes(item)) {
          const newIndex = getRandomNum(0, list.items.length - 1);
          item = list.items[newIndex];
        }
      }
      return item;
    }
  }, [rolledItems, list?.items]);

  const rollOnce = useDebounceCallback(
    useCallback(() => {
      setVisible(true);
      if (waiting) {
        return;
      }

      if (rolledItems.length === list?.items.length) {
        onEndReached();
        return;
      }

      setWaiting(true);
      timeoutRef.current = setTimeout(() => {
        const nextItem = generateNext();
        if (nextItem) {
          setRolledItems(prevState => [...prevState, nextItem]);
        }
        Vibration.vibrate(50);
        setWaiting(false);
      }, 1 * 1000);
    }, [waiting, rolledItems, generateNext, list?.items]),
    100,
  );

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
    }, [rollOnce]),
  );

  const onEndReached = () => {
    Vibration.vibrate(100);
    setRolledItems([]);
  };

  const showEditor = useCallback(() => {
    setEditorVisible(true);
  }, []);

  const hideEditor = useCallback(() => {
    setEditorVisible(false);
  }, []);

  const onSave = useCallback(
    (list: ListType) => {
      dispatch(listEditAction(list));
    },
    [dispatch],
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header
        title={list?.id ? list.title : 'List randomizer'}
        right={<IconButton name="edit" onPress={showEditor} />}
      />
      <FlatList
        data={list?.items || []}
        keyExtractor={(_, i) => i.toString()}
        ItemSeparatorComponent={() => <View style={{ height: s(10) }} />}
        contentContainerStyle={{ paddingTop: s(20), paddingBottom: s(280) }}
        renderItem={({ item, index }) => {
          const backgroundColor = isDarkMode
            ? index % 2 === 0
              ? '#212529'
              : '#313438'
            : index % 2 === 0
            ? '#edf0f2'
            : '#f0f7ff';

          return (
            <View style={[styles.listItem, { backgroundColor, shadowColor: shadowColor }]}>
              <Text size={18}>{item}</Text>
            </View>
          );
        }}
      />

      {visible && (
        <View style={[styles.overlay, isDarkMode && styles.darkStyleOverlay]}>
          <Pad
            loading={waiting}
            height={numPadH}
            content={rolledItems[rolledItems.length - 1]}
            placeholder={'Press "Start" or Shake to randomize'}
            progress={`${rolledItems.length}/${list?.items.length}`}
          />

          <RolledItems data={rolledItems} showAllDone={rolledItems.length === list?.items.length} />
        </View>
      )}
      <View pointerEvents="box-none" style={styles.footer}>
        <View
          pointerEvents="none"
          style={[styles.footerOverlay, isDarkMode && styles.darkStyleFooteOverlay]}
        />
        <StartButton
          text={rolledItems.length === list?.items.length ? 'Reset' : 'Start'}
          onPress={rollOnce}
        />
      </View>
      <ListEditor
        list={list}
        visible={editorVisible}
        defaultListName={list?.title}
        onClose={hideEditor}
        onSave={onSave}
      />
    </View>
  );
};

export default ListRandomizer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginHorizontal: s(15),
    alignItems: 'center',
    padding: s(10),
    borderRadius: s(10),
    elevation: 2,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingTop: s(120),
    backgroundColor: 'rgba(247, 249, 240,0.9)',
  },
  darkStyleOverlay: {
    backgroundColor: 'rgba(1, 12, 20,0.9)',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    bottom: 0,
    position: 'absolute',
    width: wWidth,
  },
  footerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(247, 249, 240,0.7)',
    width: '100%',
    borderTopRightRadius: wWidth * 0.5,
    borderTopLeftRadius: wWidth * 0.5,
  },
  darkStyleFooteOverlay: {
    backgroundColor: 'rgba(1, 12, 20,0.7)',
  },
});
