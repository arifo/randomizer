import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  NumberScreen: undefined;
  LetterScreen: undefined;
  ListsScreen: undefined;
  ListRandomizer: { id: string };
  DiceRoll: undefined;
  SpinWheel: undefined;
  SettingsScreen: undefined;
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> = React.FC<{
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
}>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
