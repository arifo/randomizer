import { createAction } from 'deox';

import { ListType } from './types';

export const listAddAction = createAction('lists/ADD', res => (payload: ListType) => res(payload));
export const listSortAction = createAction('lists/SORT', res => (payload: ListType[]) =>
  res(payload),
);
