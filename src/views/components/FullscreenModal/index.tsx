import React from 'react';

import { View, StyleSheet, Modal } from 'react-native';

import { isAndroid } from 'utils/platforms';
import { s, sv } from 'utils/scaler';
import { useAppTheme } from 'views/contexts/useAppTheme';

import { IconButton } from '../Buttons';
import { Container } from '../Container';
import { Text } from '../Text';

interface FullscreenModalProps {
  visible?: boolean;
  scrollEnabled?: boolean;
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
      <Text size={18} style={styles.title}>
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
  scrollEnabled = true,
}: FullscreenModalProps) => {
  const { isDarkMode } = useAppTheme();

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={isAndroid}
      visible={visible}
      onRequestClose={onClose}
      transparent>
      <Container
        scrollEnabled={scrollEnabled}
        color={isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(241, 250, 238,0.98)'}
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

  title: { fontWeight: 'bold' },
});
