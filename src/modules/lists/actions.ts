import { createAction } from 'deox';

import { ListType } from './types';

export const listAddAction = createAction('lists/ADD', res => (payload: ListType) => res(payload));
export const listEditAction = createAction('lists/EDIT', res => (payload: ListType) =>
  res(payload),
);
export const listDeleteAction = createAction('lists/DELETE', res => (id: string) => res(id));
export const listSortAction = createAction('lists/SORT', res => (payload: ListType[]) =>
  res(payload),
);
