import { createReducer } from 'deox';
import produce from 'immer';

import { listAddAction, listSortAction } from './actions';
import { Colors, Weekdays } from './samples';
import { ListsState } from './types';

const initialState: ListsState = {
  lists: [Colors, Weekdays],
};

export const listsReducer = createReducer(initialState, handle => [
  handle(listAddAction, (state, { payload }) =>
    produce(state, draft => {
      draft.lists = [payload, ...state.lists];
    }),
  ),
  handle(listSortAction, (state, { payload }) =>
    produce(state, draft => {
      draft.lists = payload;
    }),
  ),
]);
