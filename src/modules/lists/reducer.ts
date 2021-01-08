import { createReducer } from 'deox';
import produce from 'immer';

import { listAddAction, listDeleteAction, listEditAction, listSortAction } from './actions';
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
  handle(listEditAction, (state, { payload }) =>
    produce(state, draft => {
      draft.lists = state.lists.map(item => (item.id === payload.id ? payload : item));
    }),
  ),
  handle(listDeleteAction, (state, { payload }) =>
    produce(state, draft => {
      draft.lists = state.lists.filter(item => item.id !== payload);
    }),
  ),
  handle(listSortAction, (state, { payload }) =>
    produce(state, draft => {
      draft.lists = payload;
    }),
  ),
]);
