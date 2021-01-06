import React from 'react';

import { View, StyleSheet, Modal, useColorScheme } from 'react-native';

import { isAndroid } from 'utils/platforms';
import { s, sv } from 'utils/scaler';

import { IconButton } from '../Buttons';
import { Container } from '../Container';
import { Text } from '../Text';

interface FullscreenModalProps {
  visible?: boolean;
  onClose?: () => void;
  loading?: boolean;
  title?: string;
  children?: React.ReactNode;
  OverlayComponent?: React.ReactNode;
  accessibilityLabel?: string;
}

const ModalHeader = ({ onClose, title }: { onClose?: () => void; title?: string }) => (
  <View style={styles.modalHeader}>
    <View style={styles.mHeaderSides} />
    <View style={styles.mHeaderCenter}>
      <Text size={18} style={{ fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
    <View style={styles.mHeaderRight}>
      <IconButton icon="close" onPress={onClose} />
    </View>
  </View>
);

export const FullscreenModal = ({
  visible,
  onClose,
  loading,
  title,
  children,
  accessibilityLabel,
  OverlayComponent,
}: FullscreenModalProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={isAndroid}
      visible={visible}
      onRequestClose={onClose}
      transparent>
      <Container
        color={isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(233, 236, 239,0.97)'}
        loading={loading}
        Header={<ModalHeader {...{ title, onClose }} />}
        accessibilityLabel={accessibilityLabel}>
        {children}
      </Container>
      {OverlayComponent}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: sv(25),
    paddingHorizontal: s(30),
  },
  mHeaderSides: { flex: 0.3 },
  mHeaderRight: { flex: 0.3, alignItems: 'flex-end' },
  mHeaderCenter: { flex: 1, alignItems: 'center' },
});
