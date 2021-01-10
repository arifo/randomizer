import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import { Container } from '@components/Container';
import { s } from 'utils/scaler';
import { IconButton, MenuButton } from 'views/components/Buttons';
import Header from 'views/components/Header';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navToRoute = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <Container
      style={{ paddingTop: s(20), paddingHorizontal: s(15) }}
      Header={
        <Header
          withSafeArea={false}
          withBack={false}
          title="Randomize"
          // right={<IconButton icon="settings" onPress={() => navToRoute('SettingsScreen')} />}
        />
      }>
      <View style={styles.flexRow}>
        <MenuButton title="Numbers" route="NumberScreen" onPress={navToRoute} />
        <MenuButton title="Letters" route="LetterScreen" onPress={navToRoute} />
      </View>

      <View style={styles.flexRow}>
        <MenuButton title="Dice" route="DiceRoll" onPress={navToRoute} />
        <MenuButton title="Lists" route="ListsScreen" onPress={navToRoute} />
      </View>
      <View style={styles.flexRow}>
        {/* <MenuButton title="Images" route="ImageRandomizer" onPress={navToRoute} /> */}
        <MenuButton title="Spin Wheel" route="SpinWheel" onPress={navToRoute} />
      </View>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(20),
  },
  shadow: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 11,
  },
});
