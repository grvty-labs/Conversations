import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#CED0CE',
    marginLeft: '5%',
  },
  footerWrapper: {
    paddingVertical: em(1.4287),
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default defaultStyle;
