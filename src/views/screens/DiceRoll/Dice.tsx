import React from 'react';

import { View, StyleSheet } from 'react-native';

import { s } from 'utils/scaler';

interface DiceProps {
  value: number;
  color?: string;
  loading: boolean;
}
const SIZE = s(80);

export const Dice = ({ value, color = '#8cd3ff', loading }: DiceProps) => {
  const renderDice = () => {
    switch (value) {
      case 1:
        return <Face1 color={color} />;
      case 2:
        return <Face2 color={color} />;
      case 3:
        return <Face3 color={color} />;
      case 4:
        return <Face4 color={color} />;
      case 5:
        return <Face5 color={color} />;
      case 6:
        return <Face6 color={color} />;
      default:
        return <View style={[styles.face, { backgroundColor: color }]} />;
    }
  };

  const opacity = loading ? 0.6 : 1;

  return (
    <View style={[styles.container, { opacity, backgroundColor: color }]}>
      <View style={styles.background} />
      {renderDice()}
    </View>
  );
};

const Face1 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells />
    <RowCells second />
    <RowCells />
  </View>
);
const Face2 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells third />
    <RowCells />
    <RowCells first />
  </View>
);
const Face3 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells third />
    <RowCells second />
    <RowCells first />
  </View>
);
const Face4 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells first third />
    <RowCells />
    <RowCells first third />
  </View>
);
const Face5 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells first third />
    <RowCells second />
    <RowCells first third />
  </View>
);
const Face6 = ({ color }: { color: string }) => (
  <View style={[styles.face, { backgroundColor: color }]}>
    <RowCells first third />
    <RowCells first third />
    <RowCells first third />
  </View>
);

const RowCells = ({
  first,
  second,
  third,
}: {
  first?: boolean;
  second?: boolean;
  third?: boolean;
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>{first && <View style={styles.dot} />}</View>
      <View style={styles.cell}>{second && <View style={styles.dot} />}</View>
      <View style={styles.cell}>{third && <View style={styles.dot} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: { ...StyleSheet.absoluteFillObject, backgroundColor: 'grey', opacity: 0.91 },
  face: {
    padding: SIZE * 0.03,
    borderRadius: SIZE * 0.15,
  },
  row: { flexDirection: 'row' },
  cell: {
    // borderWidth: 1,
    width: SIZE / 4,
    height: SIZE / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: SIZE / 5.5,
    height: SIZE / 5.5,
    borderRadius: SIZE / 10,
    backgroundColor: 'white',
  },
});
