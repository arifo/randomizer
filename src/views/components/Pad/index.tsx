/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { Wander } from 'react-native-animated-spinkit';

import { useAppTheme } from 'views/contexts/useAppTheme';

import { Text } from '../Text';

const { width: wWidth } = Dimensions.get('window');

const numPadH = wWidth * 0.6;
const numPadW = wWidth * 0.8;

interface PadProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
  value?: number | string;
  loading?: boolean;
  Loader?: React.ReactNode;
  content?: string | number;
  progress?: string;
  placeholder?: string;
}

export const Pad: React.FC<PadProps> = ({
  width = numPadW,
  height = numPadH,
  children,
  loading,
  Loader,
  style,
  content,
  progress,
  placeholder,
}) => {
  const { isDarkMode, themeColors } = useAppTheme();

  const padColor = isDarkMode ? '#212529' : '#dee2e6';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: padColor, shadowColor: themeColors.shadowColor, width, height },
        style,
      ]}>
      {loading && !content && (
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          size={150}
          style={{ opacity: loading ? 0.5 : 1 }}>
          ?
        </Text>
      )}

      {!loading && !content && !!placeholder && (
        <Text adjustsFontSizeToFit numberOfLines={1} size={18}>
          {placeholder}
        </Text>
      )}

      {!!content && (
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          size={150}
          style={{ opacity: loading ? 0.5 : 1 }}>
          {content}
        </Text>
      )}

      {!!progress && <Text style={styles.progress}>{progress}</Text>}

      {children}

      {loading && (
        <View style={styles.loader}>
          {Loader || <Wander size={height} color={themeColors.loader} />}
        </View>
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
    paddingHorizontal: 10,
    elevation: 8,
    // shadowColor: 'rgba(92, 92, 92,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: { position: 'absolute', bottom: 5 },
});
