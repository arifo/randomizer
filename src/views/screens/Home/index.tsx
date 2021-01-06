import React from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import { Container } from '@components/Container';
import { s, sv } from 'utils/scaler';
import { ButtonBase, IconButton } from 'views/components/Buttons';
import Header from 'views/components/Header';
import { Text } from 'views/components/Text';

const { width } = Dimensions.get('window');

const buttonW = width * 0.44;
const buttonH = width * 0.4;

const MenuItem = ({ title, route, onPress }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ButtonBase
      onPress={() => onPress(route)}
      style={{ height: buttonH, width: buttonW, borderRadius: s(15) }}
      innerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text color={isDarkMode ? 'black' : 'white'} style={{ fontSize: s(22) }}>
        {title}
      </Text>
    </ButtonBase>
  );
};

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
        <MenuItem title="Number" route="NumberScreen" onPress={navToRoute} />
        <MenuItem title="Letter" route="LetterScreen" onPress={navToRoute} />
      </View>

      <View style={styles.flexRow}>
        <MenuItem title="List" route="ListScreen" onPress={navToRoute} />
        <MenuItem title="Password" route="PasswordScreen" onPress={navToRoute} />
      </View>
      <View style={styles.flexRow}>
        <MenuItem title="Word" route="WordScreen" onPress={navToRoute} />
        <MenuItem title="Yes or No" route="YesOrNoScreen" onPress={navToRoute} />
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
