// @flow
// import * as React from 'react-native';
import { Platform, NativeModules, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const { StatusBarManager } = NativeModules;

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX: number = x < 375
  ? (x < 320
    ? 0.75
    : 0.875)
  : 1;

const ratioY: number = y < 568
  ? (y < 480
    ? 0.75
    : 0.875)
  : 1;

// We set our base font size value
const baseUnit = 14;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// We add an em() shortcut function
export function em(value: number) {
  return unit * value;
}
