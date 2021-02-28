import React, { useRef } from 'react';

import * as d3Shape from 'd3-shape';

import color from 'randomcolor';
import {
  StyleSheet,
  View,
  Text as RNText,
  Dimensions,
  Animated,
  useColorScheme,
} from 'react-native';
import Svg, { Path, G, Text, TSpan } from 'react-native-svg';

import { theme } from 'theme';
import { s } from 'utils/scaler';
import { Container } from 'views/components/Container';
import Header from 'views/components/Header';
import { useAppTheme } from 'views/contexts/useAppTheme';

// const { PanGestureHandler, State } = GestureHandler;

const { width } = Dimensions.get('screen');

const numberOfSegments = 10;
const wheelSize = width * 0.98;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });

const snap = (points: number | number[]) => {
  if (typeof points === 'number') {
    return (v: number) => Math.round(v / points) * points;
  } else {
    let i = 0;
    const numPoints = points.length;

    return (v: number) => {
      let lastDistance = Math.abs(points[0] - v);

      for (i = 1; i < numPoints; i++) {
        const point = points[i];
        const distance = Math.abs(point - v);

        if (distance === 0) {
          return point;
        }

        if (distance > lastDistance) {
          return points[i - 1];
        }

        if (i === numPoints - 1) {
          return point;
        }

        lastDistance = distance;
      }
    };
  }
};

const makeWheel = () => {
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'green',
    count: numberOfSegments,
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .outerRadius(width / 2)
      .innerRadius(50);

    return {
      path: instance(arc),
      color: colors[index],
      value: Math.round(Math.random() * 10 + 1) * 200, //[200, 2200]
      centroid: instance.centroid(arc),
    };
  });
};

const SpinWheel = () => {
  const { isDarkMode, themeColors } = useAppTheme();

  const backgroundColor = themeColors.backgroundColor;
  const wheelPaths = useRef(makeWheel()).current;
  const angleAnim = useRef(new Animated.Value(0)).current;
  const angle = 0;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Header title={'Spin Wheel'} />

      <View style={styles.content}>
        {/* {this._renderKnob()} */}
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                rotate: angleAnim.interpolate({
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, '0deg', `${oneTurn}deg`],
                }),
              },
            ],
          }}>
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}>
            <G y={width / 2} x={width / 2}>
              {wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const number = arc.value.toString();

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + Math.PI * 270}
                      origin={`${x}, ${y}`}>
                      <Text x={x - 35} y={y} fill="white" textAnchor="middle" fontSize={fontSize}>
                        {i * 100}

                        {/* {Array.from({ length: number.length }).map((_, j) => {
                          return (
                            <TSpan x={x} dy={fontSize} key={`arc-${i}-slice-${j}`}>
                              {number.charAt(j)}
                            </TSpan>
                          );
                        })} */}
                      </Text>
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
};

export default SpinWheel;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingBottom: s(100) },
});
