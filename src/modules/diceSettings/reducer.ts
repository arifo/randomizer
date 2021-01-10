import { createReducer } from 'deox';
import produce from 'immer';

import { setDiceCount, setPressToStart, setShakeToStart } from './actions';
import { DiceSettingsState } from './types';

const initialState: DiceSettingsState = {
  diceCount: 2,
  pressToStart: true,
  shakeToStart: true,
};

export const diceSettingsReducer = createReducer(initialState, handle => [
  handle(setDiceCount, (state, { payload }) =>
    produce(state, draft => {
      draft.diceCount = payload;
    }),
  ),
  handle(setPressToStart, (state, { payload }) =>
    produce(state, draft => {
      draft.pressToStart = payload;
    }),
  ),
  handle(setShakeToStart, (state, { payload }) =>
    produce(state, draft => {
      draft.shakeToStart = payload;
    }),
  ),
]);
