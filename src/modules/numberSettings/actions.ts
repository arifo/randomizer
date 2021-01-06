import { createAction } from 'deox';

export const setMinNumber = createAction('number/MIN_NUMBER', res => (payload: number) =>
  res(payload),
);

export const setMaxNumber = createAction('number/MAX_NUMBER', res => (payload: number) =>
  res(payload),
);

export const setNumbersCount = createAction('number/NUMBERS_COUNT', res => (payload: number) =>
  res(payload),
);

export const setDelay = createAction('number/DELAY', res => (payload: number) => res(payload));

export const setAutoGenerate = createAction('number/AUTO_GENERATE', res => (payload: boolean) =>
  res(payload),
);
export const setUniqueOnly = createAction('number/UNIQUE_ONLY', res => (payload: boolean) =>
  res(payload),
);

export const setPressToStart = createAction('number/PRESS_TO_START', res => (payload: boolean) =>
  res(payload),
);
export const setShakeToStart = createAction('number/SHAKE_TO_START', res => (payload: boolean) =>
  res(payload),
);

export const setDefaultSettings = createAction('number/DEFAULT_SETTINGS');
