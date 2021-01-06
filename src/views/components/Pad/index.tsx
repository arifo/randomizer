import React from 'react';

import { View, StyleSheet, useColorScheme, Dimensions, ViewStyle } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';

const { width: wWidth } = Dimensions.get('window');

const numPadH = wWidth * 0.6;
const numPadW = wWidth * 0.8;

interface PadProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
  value?: number | string;
  hint?: string;
  loading?: boolean;
  Loader?: React.ReactNode;
}

export const Pad: React.FC<PadProps> = ({
  width = numPadW,
  height = numPadH,
  children,
  loading,
  Loader,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const padColor = isDarkMode ? '#212529' : '#dee2e6';

  return (
    <View style={[styles.container, { backgroundColor: padColor, width, height }, style]}>
      {children}
      {loading && (
        <View style={styles.loader}>{Loader || <Chase size={height * 0.7} color={'blue'} />}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: numPadW,
    height: numPadH,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 11,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
