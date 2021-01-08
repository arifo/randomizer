import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DicesScreen from 'views/screens/Dices';
import HomeScreen from 'views/screens/Home';
import LetterScreen from 'views/screens/Letter';
import ListRandomizer from 'views/screens/ListRandomizer';
import ListsScreen from 'views/screens/Lists';
import NumberScreen from 'views/screens/Number';
import SettingsScreen from 'views/screens/Settings';

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
    <RootStack.Screen name="DicesScreen" component={DicesScreen} options={{ headerShown: false }} />

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
