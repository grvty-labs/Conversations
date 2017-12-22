// @flow
import * as React from 'react';
import { ViewPropTypes } from 'react-native';

export type ListItemPropTypes = {
  id: string | number,
  icon: string,
  title: string,
  subtitle?: string,
  extra?: ReactClass<*>,
  style?: ViewPropTypes.style,

  onPress: Function,
};

export type ListStorePropTypes = {
  ItemComponent?: ReactClass<*>,
  itemsData?: Array<{ [key: string]: string | number }>,
  style?: ViewPropTypes.style,
  refreshing?: boolean,
};
export type ListActionPropTypes = {
  fetchItemsList?: Function,
};

export type ChannelUser = {
  userId: number | string,
  name: string,
  initials?: string,
  color?: string,
  imageUrl?: string,
  subtitle?: string,
}

export type ChannelMessage = {
  id: number | string,
  attachmentUrl?: string,
  text: string,
  date: string,
  dateObj?: Date,
  userId: number | string,
};

export type ChannelStorePropTypes = {
  myUserId: number | string,
  systemUserId?: number | string,
  messages?: Array<ChannelMessage>,
  inputbarStyle?: ViewPropTypes.style,
  style?: ViewPropTypes.style,
  actionIcon?: React.Node,
  sendIcon?: React.Node,
  messageStyle?: ViewPropTypes.style,
  imageSelected?: string,
};
export type ChannelActionPropTypes = {
  extraAction?: Function,
  onSend: Function,
};
