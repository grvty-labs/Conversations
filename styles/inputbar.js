import { StyleSheet } from 'react-native';
import { em } from './index';

const defaultStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#dadada',
    borderColor: '#b5b5b5',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
  },

  extraIconsWrapper: {
    flexDirection: 'row',
  },

  iconButtonWrapper: {
    borderRadius: 4,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    height: 40,
    width: 40,
  },
  openExtraIconsButtonIconWrapper: {
    backgroundColor: 'rgb(92, 139, 209)',
  },
  attachmentButtonIconWrapper: {
    backgroundColor: 'rgb(58, 194, 92)',
  },
  voiceButtonIconWrapper: {
    backgroundColor: 'rgb(233, 136, 57)',
  },
  sendButtonIconWrapper: {
    backgroundColor: 'rgb(74, 162, 200)',

  },

  input: {
    backgroundColor: '#ffffff',
    borderColor: '#8b8b8b',
    borderRadius: em(3),
    borderWidth: 1,
    // flex: 1,
    height: em(3),
    marginHorizontal: 10,
    paddingHorizontal: em(1.5),
  },
});

export const fallbackStyle = StyleSheet.create({
  wrapper: {},

  extraIconsWrapper: {},
  iconButtonWrapper: {},
  iconWrapper: {},
  attachmentButtonIconWrapper: {},
  sendButtonIconWrapper: {},

  input: {},
});

export default defaultStyle;
