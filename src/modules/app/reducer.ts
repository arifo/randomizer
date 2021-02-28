import { createReducer } from 'deox';
import produce from 'immer';
import { Appearance } from 'react-native';

import { setDarkAction } from './actions';

const initialState = {
  darkMode: Appearance.getColorScheme() === 'dark',
};

export const appReducer = createReducer(initialState, handle => [
  handle(setDarkAction, (state, { payload }) =>
    produce(state, draft => {
      draft.darkMode = payload;
    }),
  ),
]);
