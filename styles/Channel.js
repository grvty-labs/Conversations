import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  separator: {
    marginVertical: em(0.5),
    width: '100%',
  },
  headerWrapper: {
    paddingVertical: em(0.2),
  },
  footerWrapper: {
    paddingVertical: em(1.4287),
  },
});

export const fallbackStyle = StyleSheet.create({
  wrapper: {},
  listWrapper: {},
  separator: {},
  headerWrapper: {},
  footerWrapper: {},
});

export default defaultStyle;
