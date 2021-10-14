import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DiceRoll from 'views/screens/DiceRoll';
import HomeScreen from 'views/screens/Home';
import LetterScreen from 'views/screens/Letter';
import ListRandomizer from 'views/screens/ListRandomizer';
import ListsScreen from 'views/screens/Lists';
import NumberScreen from 'views/screens/Number';
import SettingsScreen from 'views/screens/Settings';
import SpinWheel from 'views/screens/SpinWheel';

import { RootStackParamList } from './list';

const options = { headerShown: false };

const RootStack = createStackNavigator<RootStackParamList>();
const RootStackScreens = () => (
  <RootStack.Navigator screenOptions={options}>
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="NumberScreen" component={NumberScreen} />
    <RootStack.Screen name="LetterScreen" component={LetterScreen} />
    <RootStack.Screen name="ListsScreen" component={ListsScreen} />
    <RootStack.Screen name="ListRandomizer" component={ListRandomizer} />
    <RootStack.Screen name="DiceRoll" component={DiceRoll} />
    <RootStack.Screen name="SpinWheel" component={SpinWheel} />

    <RootStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </RootStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreens />
    </NavigationContainer>
  );
};

export default AppNavigator;
