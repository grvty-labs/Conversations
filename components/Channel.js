// @flow
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import defaultStyle from '../styles/Channel';
import type {
  ChannelStorePropTypes,
  ChannelActionPropTypes,
  ChannelMessage,
  ChannelUser,
} from '../flowTypes';

type Props = ChannelStorePropTypes & ChannelActionPropTypes;
type Default = {
  defaultUserImage: string,
  style: ViewPropTypes.style;
};
type State = {
  messages: Array<ChannelMessage>,
  users: {
    [userId: number | string]: ChannelUser,
  }
};

/**
 * My Payments list component.
 */
export default class Channel extends React.Component<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    defaultUserImage: '../assets/defaultUserImage.png',
    style: defaultStyle,
  };

  constructor(props: Props) {
    super(props);
    (this: any).keyExtractor = this.keyExtractor.bind(this);
    (this: any).renderMessage = this.renderMessage.bind(this);
    this.style = {  // For flow and to prevent 'undefined key' issues
      wrapper: {},
      messageRow: {},
      messageFromAnyone: {},
      messageFromMe: {},
      messageFromOther: {},
      messageFromSystem: {},
      ...props.style,
    };
  }

  state: State = {
    messages: [
      { id: 1, attachmentUrl: '', text: 'Hola', date: '2017', userId: 1 },
      { id: 2, attachmentUrl: '', text: 'Hola!!!', date: '2017', userId: 2 },
      { id: 3, attachmentUrl: '', text: 'Como estas', date: '2017', userId: 1 },
      { id: 4, attachmentUrl: '', text: 'Bien y tu?', date: '2017', userId: 2 },
      { id: 5, attachmentUrl: '', text: 'Que tal te trata la vida?', date: '2017', userId: 2 },
      { id: 6, attachmentUrl: '', text: 'De diez! Estoy programando un chat!', date: '2017', userId: 1 },
      { id: 7, attachmentUrl: '', text: 'Siempre he querido programar uno!', date: '2017', userId: 1 },
      { id: 8, attachmentUrl: '', text: 'Y va a estar disponible para React y React Native', date: '2017', userId: 1 },
      { id: 8, attachmentUrl: '', text: 'Woooow!!! Felicidades!!!', date: '2017', userId: 2 },
    ],
    users: {
      1: {
        userId: 1,
        imageUrl: 'https://secure.gravatar.com/avatar/63dd69ea790eabb4d9749c6319d9e3db',
        name: 'Daniel Ortíz',
        subtitle: 'Developer',
      },
      2: {
        userId: 2,
        imageUrl: 'https://en.gravatar.com/userimage/99865362/7a4f603f40dfda0ae6e731aa799f455c.png',
        name: 'GRVTY Digital',
        subtitle: 'Development Agency',
      },
    },
  };

  componentDidMount() {}
  componentWillMount() {}

  /*
   * Extract the item's key for the list render. The key must be a
   * string and  unique in the whole list. This function is executed over
   * all items of the itemsData list.
   * @param {any} item A single item inside the itemsData list
   * @returns {string} The new key for the list of React objects
   */
  keyExtractor = (item: ChannelMessage) => `${item.id}`

  renderMessage(itemData: { item: ChannelMessage }) {
    return (
      <View style={this.style.messageRow}>
        <View style={[this.style.messageFromAnyone]}>
          <Text>{itemData.item.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={this.style.wrapper}
        data={this.state.messages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMessage}
      />
    );
  }
}
