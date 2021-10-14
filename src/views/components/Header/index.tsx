import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { s } from 'utils/scaler';

import { IconButton } from '../Buttons';
import { Text } from '../Text';

const hitSlop = { top: 15, left: 15, right: 25, bottom: 20 };

interface HeaderProps {
  left?: JSX.Element;
  center?: JSX.Element;
  right?: JSX.Element;
  sidesFlex?: number;
  withBack?: boolean;
  title?: string;
  withSafeArea?: boolean;
  onBackPress?: () => void;
  style?: ViewStyle;
  withShadow?: boolean;
}

const Container: React.FC<{ withSafeArea?: boolean; withShadow?: boolean }> = ({
  withSafeArea,
  withShadow,
  children,
}) =>
  withSafeArea ? (
    <SafeAreaView edges={['top']} style={[styles.safeArea, withShadow && styles.shadow]}>
      {children}
    </SafeAreaView>
  ) : (
    <>{children}</>
  );

const Header = ({
  left,
  center,
  right,
  sidesFlex,
  withBack = true,
  withSafeArea = true,
  title,
  onBackPress,
  style,
  withShadow = true,
}: HeaderProps) => {
  const navigation = useNavigation();
  const sideViewStyles = typeof sidesFlex === 'number' ? { flex: sidesFlex } : {};

  const handleBackPress = () => {
    if (typeof onBackPress === 'function') {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <Container withSafeArea={withSafeArea} withShadow={withShadow}>
      <View style={[styles.container, style]}>
        <View style={[styles.left, sideViewStyles]}>
          {withBack && !left ? (
            <IconButton hitSlop={hitSlop} name="chevronLeft" onPress={handleBackPress} />
          ) : (
            left
          )}
        </View>
        <View style={styles.center}>
          {title && !center ? <Text size={16}>{title}</Text> : center}
        </View>
        <View style={[styles.right, sideViewStyles]}>{right}</View>
      </View>
    </Container>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 10,
  },
  container: {
    height: s(60),
    paddingTop: 10,
    flexDirection: 'row',
  },
  left: {
    flex: 0.3,
    paddingLeft: s(16),
    justifyContent: 'center',
  },
  right: {
    flex: 0.3,
    paddingRight: s(16),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    elevation: 3,
    shadowColor: 'rgba(81, 81, 81, 0.4)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 11,
  },
});
