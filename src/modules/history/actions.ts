import { createAction } from 'deox';

import { NumberHistoryType } from './types';

export const saveNumberHistory = createAction(
  'history/SET_NUMBER_HISTORY',
  res => (payload: NumberHistoryType) => res(payload),
);
