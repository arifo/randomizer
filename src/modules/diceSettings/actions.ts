import { createAction } from 'deox';

export const setDiceCount = createAction('dice/SET_COUNT', res => (payload: number) =>
  res(payload),
);

export const setPressToStart = createAction('dice/PRESS_TO_START', res => (payload: boolean) =>
  res(payload),
);
export const setShakeToStart = createAction('dice/SHAKE_TO_START', res => (payload: boolean) =>
  res(payload),
);
