import { useMemo } from 'react';

import { Action } from 'deox';
import { useDispatch } from 'react-redux';
import { ActionCreator, bindActionCreators } from 'redux';

export function useAction<T extends ActionCreator<Action<string>>>(action: T): T {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch]);
}
