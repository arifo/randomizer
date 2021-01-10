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

const RootStack = createStackNavigator();
const RootStackScreens = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <RootStack.Screen
      name="NumberScreen"
      component={NumberScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="LetterScreen"
      component={LetterScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="ListsScreen" component={ListsScreen} options={{ headerShown: false }} />
    <RootStack.Screen
      name="ListRandomizer"
      component={ListRandomizer}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="DiceRoll" component={DiceRoll} options={{ headerShown: false }} />
    <RootStack.Screen name="SpinWheel" component={SpinWheel} options={{ headerShown: false }} />

    <RootStack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
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
