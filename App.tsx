import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppContainer from 'AppContainer';
import store, { persistor } from 'store';

declare const global: { HermesInternal: null | {} };

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
