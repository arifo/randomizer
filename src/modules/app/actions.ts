import { createAction } from 'deox';

export const resetStore = createAction('app/RESET_STORE');

export const setDarkAction = createAction('app/SET_DARK_MODE', res => (payload: boolean) =>
  res(payload),
);
