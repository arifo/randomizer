import { createReducer } from 'deox';
import produce from 'immer';

import { fooAction } from './actions';

const initialState = {
  foo: 'bar',
};

export const appReducer = createReducer(initialState, handle => [
  handle(fooAction, state =>
    produce(state, draft => {
      draft.foo = 'baz';
    }),
  ),
]);
