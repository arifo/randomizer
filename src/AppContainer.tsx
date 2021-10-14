import React, { useEffect } from 'react';

import { View, StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import AppNavigator from 'navigation';
import { useAppTheme } from 'views/contexts/useAppTheme';

function AppContainer() {
  const {
    isDarkMode,
    themeColors: { backgroundColor },
  } = useAppTheme();
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <AppNavigator />
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaProvider>
    </View>
  );
}

export default AppContainer;
