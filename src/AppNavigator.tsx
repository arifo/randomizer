import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'views/screens/Home';
import LetterScreen from 'views/screens/Letter';
import ListScreen from 'views/screens/List';
import NumberScreen from 'views/screens/Number';
import PasswordScreen from 'views/screens/Password';
import SettingsScreen from 'views/screens/Settings';
import WordScreen from 'views/screens/Word';
import YesOrNoScreen from 'views/screens/YesOrNo';

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
    <RootStack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }} />
    <RootStack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="WordScreen" component={WordScreen} options={{ headerShown: false }} />
    <RootStack.Screen
      name="YesOrNoScreen"
      component={YesOrNoScreen}
      options={{ headerShown: false }}
    />
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
