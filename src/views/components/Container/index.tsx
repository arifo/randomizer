import React from 'react';

import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  ViewStyle,
  ViewProps,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from 'theme';
import { isIOS } from 'utils/platforms';
import { s } from 'utils/scaler';

const KeyboarAwareContainer: React.FC = ({ children }) => {
  if (isIOS) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.safe}>
        {children}
      </KeyboardAvoidingView>
    );
  }
  return <>{children}</>;
};

interface ContainerProps extends ViewProps {
  style?: ViewStyle;
  padding?: number;
  edges?: Edge[];
  Header?: JSX.Element;
  Footer?: JSX.Element;
  loading?: boolean;
  color?: string;
  loadingMessage?: string;
  keyboardShouldPersistTaps?: boolean | 'never' | 'handled' | 'always' | undefined;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  Header,
  Footer,
  style,
  color,
  padding,
  ...props
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? theme.dark : theme.light;
  const backgroundColor = color || themeColors.backgroundColor;
  const containerStyles: ViewStyle = {
    paddingHorizontal: padding ? s(padding) : undefined,
    // backgroundColor,
    ...style,
  };
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      {Header}
      <KeyboarAwareContainer>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          {...props}
          contentContainerStyle={containerStyles}>
          {children}
        </ScrollView>
        {Footer}
      </KeyboarAwareContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {},
});
