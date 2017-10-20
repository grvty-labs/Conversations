import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  wrapper: {
    padding: em(1.0714),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  icon: {
    width: em(2.857),
    height: em(2.857),
    borderRadius: em(2.857),
  },

  textWrapper: {
    flex: 3,
    paddingHorizontal: em(0.714),
    justifyContent: 'center',
  },
  titleText: {
    fontSize: em(1.1428),
  },
  subtitleText: {
    fontSize: em(0.9285),
  },

  extraWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default defaultStyle;
