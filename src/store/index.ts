import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
export const { dispatch } = store;
export const { getState } = store;
export const persistor = persistStore(store);
// persistor.purge();
