import React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';

import { s } from 'utils/scaler';

import { Text } from '../Text';

interface PromptProps {
  visible: boolean;
  value: string;
  onChangeText: (t: string) => void;
  yesPress: () => void;
  noPress: () => void;
}

const ActionButton = ({ text, onPress }: { text: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <Text size={16}>{text}</Text>
    </TouchableOpacity>
  );
};

export const Prompt = ({ visible, value, onChangeText, yesPress, noPress }: PromptProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (!visible) {
    return null;
  }

  const backgroundColor = isDarkMode ? '#6c757d' : '#e9ecef';
  const inputColor = isDarkMode ? '#ced4da' : '#f5f5f5';
  const borderColor = isDarkMode ? '#ced4da' : '#f5f5f5';

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.safe}>
        <View style={[styles.popup, { backgroundColor }]}>
          <Text style={styles.title}>List title</Text>
          <TextInput
            autoFocus
            value={value}
            onChangeText={onChangeText}
            style={[styles.input, { backgroundColor: inputColor }]}
            onSubmitEditing={() => yesPress()}
            returnKeyType="done"
          />
          <View style={[styles.footer, { borderTopColor: borderColor }]}>
            <ActionButton text="Cancel" onPress={noPress} />
            <View style={[styles.separator, { backgroundColor: borderColor }]} />
            <ActionButton text="Save" onPress={yesPress} />
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
    marginBottom: s(15),
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    width: '90%',
    padding: 0,
    alignSelf: 'center',
    height: s(40),
    borderRadius: s(8),
    paddingHorizontal: 10,
    marginBottom: s(10),
    fontSize: s(15),
  },
  footer: { flexDirection: 'row', width: '100%', height: s(50), borderTopWidth: 1 },
  actionButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  separator: { height: '100%', width: 1 },
});
