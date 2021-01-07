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
          title="Randomizer"
          right={<IconButton icon="settings" onPress={() => navToRoute('SettingsScreen')} />}
        />
      }>
      <View style={styles.flexRow}>
        <MenuButton title="Number" route="NumberScreen" onPress={navToRoute} />
        <MenuButton title="Letter" route="LetterScreen" onPress={navToRoute} />
      </View>

      <View style={styles.flexRow}>
        <MenuButton title="List" route="ListsScreen" onPress={navToRoute} />
        <MenuButton title="Yes or No" route="YesOrNoScreen" onPress={navToRoute} />
      </View>
      <View style={styles.flexRow}>
        {/* <MenuButton title="Password" route="PasswordScreen" onPress={navToRoute} /> */}
        {/* <MenuButton title="Word" route="WordScreen" onPress={navToRoute} /> */}
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
