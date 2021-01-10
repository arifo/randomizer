import React, { useCallback, useRef, useState } from 'react';

import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';

import { View, StyleSheet, FlatList, useColorScheme, Dimensions, Vibration } from 'react-native';

import RNShake from 'react-native-shake';
import { useSelector } from 'react-redux';

import { ListEditor } from '@components/ListEditor';
import { useAction } from 'hooks/useAction';
import { useDebounceCallback } from 'hooks/useDebounce';
import { listEditAction } from 'modules/lists/actions';
import { getRandomNum } from 'randomizer';
import { theme } from 'theme';
import { RootState } from 'types';
import { s } from 'utils/scaler';
import { StartButton, IconButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { Pad } from 'views/components/Pad';
import { RolledItems } from 'views/components/RolledItems';
import { Text } from 'views/components/Text';

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const numPadH = wHeight * 0.35;

const ListRandomizer = () => {
  const save = useAction(listEditAction);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const backgroundColor = themeColors.backgroundColor;

  const route = useRoute<RouteProp<{ ListRandomizer: { id: string } }, 'ListRandomizer'>>();
  const { id } = route.params;
  const { lists } = useSelector((state: RootState) => state.lists);
  const list = lists.find(i => i.id === id);

  const [editorVisible, setEditorVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rolledItems, setRolledItems] = useState<string[]>([]);
  const [waiting, setWaiting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
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

  const generateNext = () => {
    if (list?.items) {
      const index = getRandomNum(0, list?.items.length - 1);
      let item = list?.items[index];

      if (rolledItems.includes(item)) {
        while (rolledItems.includes(item)) {
          const newIndex = getRandomNum(0, list?.items.length - 1);
          item = list?.items[newIndex];
        }
      }
      return item;
    }
  };

  const onEndReached = () => {
    Vibration.vibrate(100);
    setRolledItems([]);
  };

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
    }, [waiting, rolledItems]),
    100,
  );

  const showEditor = () => {
    setEditorVisible(true);
  };
  const hideEditor = () => {
    setEditorVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header
        title={list?.id ? list.title : 'List randomizer'}
        right={<IconButton icon="edit" onPress={showEditor} />}
      />
      <FlatList
        data={list?.items || []}
        keyExtractor={(_, i) => i.toString()}
        ItemSeparatorComponent={() => <View style={{ height: s(10) }} />}
        contentContainerStyle={{ paddingTop: s(20), paddingBottom: s(280) }}
        renderItem={({ item, index }) => {
          const backgroundColor = isDarkMode
            ? `rgba(33, 37, 41,${index % 2 === 0 ? 1 : 0.5})`
            : `rgba(222, 226, 230, ${index % 2 === 0 ? 1 : 0.5})`;

          return (
            <View style={[styles.listItem, { backgroundColor }]}>
              <Text size={18}>{item}</Text>
            </View>
          );
        }}
      />

      {visible && (
        <View
          style={[
            styles.overlay,
            { backgroundColor: isDarkMode ? 'rgba(1, 12, 20,0.9)' : 'rgba(247, 249, 240,0.9)' },
          ]}>
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
          style={[
            styles.footerOverlay,
            { backgroundColor: isDarkMode ? 'rgba(1, 12, 20,0.7)' : 'rgba(247, 249, 240,0.7)' },
          ]}
        />
        <StartButton
          text={rolledItems.length === list?.items.length ? 'Reset' : 'Start'}
          onPress={rollOnce}
        />
      </View>
      <ListEditor list={list} visible={editorVisible} onClose={hideEditor} onSave={save} />
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
    elevation: 5,
    shadowColor: 'rgba(219, 219, 219,1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingTop: s(120),
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

    width: '100%',
    borderTopRightRadius: wWidth * 0.5,
    borderTopLeftRadius: wWidth * 0.5,
  },
});
