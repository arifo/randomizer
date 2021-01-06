import { createReducer } from 'deox';
import produce from 'immer';

import { saveNumberHistory } from './actions';

import { HistoryState } from './types';

const initialState: HistoryState = {
  numbers: [],
};

export const historyReducer = createReducer(initialState, handle => [
  handle(saveNumberHistory, (state, { payload }) =>
    produce(state, draft => {
      draft.numbers = [payload, ...state.numbers];
    }),
  ),
]);
