import React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';

import { s } from 'utils/scaler';

import { Text } from '../Text';

export interface PopupProps {
  visible: boolean;
  yesPress?: () => void;
  noPress?: () => void;
  title?: string;
  noText?: string;
  yesText?: string;
}

const ActionButton = ({ text, onPress }: { text: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <Text size={16}>{text}</Text>
    </TouchableOpacity>
  );
};

export const BasePopup: React.FC<PopupProps> = ({
  children,
  visible,
  yesPress,
  noPress,
  noText,
  yesText,
  title,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (!visible) {
    return null;
  }

  const backgroundColor = isDarkMode ? '#6c757d' : '#e9ecef';
  const borderColor = isDarkMode ? '#ced4da' : '#f5f5f5';

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.safe}>
        <View style={[styles.popup, { backgroundColor }]}>
          {!!title && (
            <Text style={[styles.title, !children && { marginBottom: s(15) }]}>{title}</Text>
          )}
          {children}

          <View style={[styles.footer, { borderTopColor: borderColor }]}>
            <ActionButton text={noText || 'Cancel'} onPress={noPress} />
            <View style={[styles.separator, { backgroundColor: borderColor }]} />
            <ActionButton text={yesText || 'Ok'} onPress={yesPress} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  safe: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  popup: { borderRadius: 10, overflow: 'hidden', width: '94%' },
  title: {
    textAlign: 'center',
    marginTop: s(20),
    marginBottom: s(5),
    fontWeight: 'bold',
    fontSize: 20,
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
    height: s(50),

    borderTopWidth: 1,
  },
  actionButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  separator: { height: '100%', width: 1 },
});
