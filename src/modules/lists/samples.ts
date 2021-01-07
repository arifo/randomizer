import { uniqueId } from 'utils/strings';

import { ListType } from './types';

export const Colors: ListType = {
  id: uniqueId(),
  items: [
    'Black',
    'Blue',
    'Brown',
    'Grey',
    'Green',
    'Orange',
    'Pink',
    'Purple',
    'Red',
    'White',
    'Yellow',
  ],
  title: 'Colors',
};

export const Weekdays: ListType = {
  id: uniqueId(),
  items: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  title: 'Weekdays',
};
