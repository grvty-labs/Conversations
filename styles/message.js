import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: em(1),
    width: '100%',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },

  userIcon: {
    borderRadius: em(2.857),
    height: em(2.857),
    marginRight: em(0.7),
    width: em(2.857),
  },
  userIconText: {
    alignItems: 'center',
    color: '#ffffff',
    fontSize: em(1.4),
    fontWeight: '900',
    justifyContent: 'center',
    textAlign: 'center',
  },

  messageBase: {
    backgroundColor: '#e3bfe0',
    borderRadius: 5,
    height: 'auto',
    maxWidth: '75%',
    paddingHorizontal: em(1.1),
    paddingVertical: em(1.1),
  },
  messageFromMe: {
    backgroundColor: '#3945da',
  },
  messageFromOther: {
    backgroundColor: '#9bc9cc',
  },
  messageFromSystem: {
    alignSelf: 'center',
    backgroundColor: '#ffe57c',
    paddingHorizontal: em(1.1),
    paddingVertical: em(0.6),
    width: 'auto',
  },
});


export const fallbackStyle = StyleSheet.create({
  messageRow: {},
  messageRowLeft: {},
  messageRowRight: {},
  userIcon: {},
  messageBase: {},
  messageFromMe: {},
  messageFromOther: {},
  messageFromSystem: {},
});

export default defaultStyle;
