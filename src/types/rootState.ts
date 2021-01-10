import { DiceSettingsState } from 'modules/diceSettings/types';
import { HistoryState } from 'modules/history/types';
import { ListsState } from 'modules/lists/types';
import { NumberSettingsState } from 'modules/numberSettings/types';

export interface RootState {
  app: { foo: string };
  diceSettings: DiceSettingsState;
  numberSettings: NumberSettingsState;
  history: HistoryState;
  lists: ListsState;
}
