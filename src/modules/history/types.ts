export type NumberHistoryType = {
  randomNumbers: number[];
  min: number;
  max: number;
  count: number;
  date: Date;
};

export type HistoryState = {
  numbers: Array<NumberHistoryType>;
};
