import AsyncStorage from '@react-native-community/async-storage';
import { getType } from 'deox';
import { Action, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { resetStore } from 'modules/app/actions';
import { appReducer } from 'modules/app/reducer';
import { historyReducer } from 'modules/history/reducer';
import { listsReducer } from 'modules/lists/reducer';
import { numberSettingsReducer } from 'modules/numberSettings/reducer';
import { RootState } from 'types';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['numberSettings', 'lists'],
};

const projectReducer = combineReducers({
  app: appReducer,
  numberSettings: numberSettingsReducer,
  history: historyReducer,
  lists: listsReducer,
});

const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === getType(resetStore)) {
    state = undefined;
  }
  return projectReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
