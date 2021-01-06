import { createReducer } from 'deox';
import produce from 'immer';

import {
  setMinNumber,
  setMaxNumber,
  setNumbersCount,
  setDelay,
  setUniqueOnly,
  setPressToStart,
  setShakeToStart,
  setAutoGenerate,
  setDefaultSettings,
} from './actions';
import { NumberSettingsState } from './types';

const initialState: NumberSettingsState = {
  minNum: 1,
  maxNum: 20,
  count: 5,
  delay: 2,
  autoGenerate: false,
  uniqueOnly: true,
  pressToStart: true,
  shakeToStart: true,
};

export const numberSettingsReducer = createReducer(initialState, handle => [
  handle(setDefaultSettings, () => initialState),
  handle(setMinNumber, (state, { payload }) =>
    produce(state, draft => {
      draft.minNum = payload;
    }),
  ),
  handle(setMaxNumber, (state, { payload }) =>
    produce(state, draft => {
      draft.maxNum = payload;
    }),
  ),
  handle(setNumbersCount, (state, { payload }) =>
    produce(state, draft => {
      draft.count = payload;
    }),
  ),
  handle(setDelay, (state, { payload }) =>
    produce(state, draft => {
      draft.delay = payload;
    }),
  ),
  handle(setAutoGenerate, (state, { payload }) =>
    produce(state, draft => {
      draft.autoGenerate = payload;
    }),
  ),
  handle(setUniqueOnly, (state, { payload }) =>
    produce(state, draft => {
      draft.uniqueOnly = payload;
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
