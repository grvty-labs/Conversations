import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  messageRow: {
    paddingHorizontal: em(1),
    alignItems: 'flex-start',
  },

  messageFromAnyone: {
    backgroundColor: '#e3bfe0',
    paddingHorizontal: em(0.7142),
    width: '80%',
  },
  messageFromMe: {
    backgroundColor: '#9299f1',
    alignSelf: 'flex-end',
  },
  messageFromOther: {
    backgroundColor: '#dee1e9',
    alignSelf: 'flex-start',
  },
  messageFromSystem: {
    backgroundColor: '#f4e8b8',
    alignSelf: 'center',
  },

});

export default defaultStyle;
