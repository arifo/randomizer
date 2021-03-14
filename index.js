/**
 * @format
 */
import 'react-native-gesture-handler';
import { enableES5 } from 'immer';
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

enableES5();
AppRegistry.registerComponent(appName, () => App);
