// @flow
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import { getNameInitials, getNameColor } from '../../utils/userIconGenerator';
import Inputbar from './inputbar';
import Message from './message';
import defaultStyle, { fallbackStyle } from '../../styles/Channel';
import type {
  ChannelStorePropTypes,
  ChannelActionPropTypes,
  ChannelMessage,
  ChannelUser,
} from '../../flowTypes';

type Props = ChannelStorePropTypes & ChannelActionPropTypes;
type Default = {
  systemUserId: number | string,
  style: ViewPropTypes.style;
};
type State = {
  text: string,
  refreshing: boolean,
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
    style: defaultStyle,
    systemUserId: 0,
  };

  constructor(props: Props) {
    super(props);
    (this: any).fetchChannelMessages = this.fetchChannelMessages.bind(this);
    (this: any).fetchChannelUsers = this.fetchChannelUsers.bind(this);
    (this: any).keyExtractor = this.keyExtractor.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderHeader = this.renderHeader.bind(this);
    (this: any).renderMessage = this.renderMessage.bind(this);
    (this: any).renderSeparator = this.renderSeparator.bind(this);
    this.style = {  // For flow and to prevent 'undefined key' issues
      ...fallbackStyle,
      ...props.style,
    };
  }

  state: State = {
    messages: [],
    users: {},
    refreshing: false,
    text: '',
  };

  componentDidMount() {
    this.fetchChannelUsers();
    this.fetchChannelMessages();
  }
  componentWillMount() {}

  /*
   * Extract the item's key for the list render. The key must be a
   * string and  unique in the whole list. This function is executed over
   * all items of the itemsData list.
   * @param {any} item A single item inside the itemsData list
   * @returns {string} The new key for the list of React objects
   */
  keyExtractor = (item: ChannelMessage) => `${item.id}`

  /*
   * Fetch the users that are inside this chat.
   */
  fetchChannelMessages() {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true }, () => {
        const msgsFetched: Array<ChannelMessage> = [
          { id: 13, attachmentUrl: '', text: 'We need to make all the styling replazable, and all the documentation', date: '2017', userId: 1 },
          { id: 12, attachmentUrl: '', text: 'Maybe... 3 weeks? I am still fighting with the "generic" part', date: '2017', userId: 1 },
          { id: 11, attachmentUrl: '', text: 'I still don\'t know, but I think it will be done soon', date: '2017', userId: 1 },
          { id: 10, attachmentUrl: '', text: 'When is it going to be released?', date: '2017', userId: 2 },
          { id: 9, attachmentUrl: '', text: 'Woooow!!! Congratulations!!!', date: '2017', userId: 2 },
          { id: 8, attachmentUrl: '', text: 'And it is going to be available for  React and React Native!!', date: '2017', userId: 1 },
          { id: 7, attachmentUrl: '', text: 'I have always wanted to build one!', date: '2017', userId: 1 },
          { id: 6, attachmentUrl: '', text: 'It is goddamn awesome! I am building a generic chat interface!', date: '2017', userId: 1 },
          { id: 5.5, attachmentUrl: '', text: 'Updated internals', date: '2017', userId: 0 },
          { id: 5, attachmentUrl: '', text: 'How is life treating you?', date: '2017', userId: 2 },
          { id: 4, attachmentUrl: '', text: 'Awesome and you?', date: '2017', userId: 2 },
          { id: 3, attachmentUrl: '', text: 'How have you been?', date: '2017', userId: 1 },
          { id: 2, attachmentUrl: '', text: 'Hi my friend!!!', date: '2017', userId: 2 },
          { id: 1, attachmentUrl: '', text: 'Hello', date: '2017', userId: 1 },
          { id: 0.5, attachmentUrl: '', text: 'You are connected again', date: '2017', userId: 0 },
          { id: 0, attachmentUrl: '', text: 'You are now connected', date: '2017', userId: 0 },
        ];

        const msgsClean = msgsFetched.map(msg => ({ ...msg, dateObj: new Date() }));

        this.setState({ messages: msgsClean, refreshing: false });
      });
    }
  }

  /*
   * Fetch the users that are inside this chat.
   */
  fetchChannelUsers() {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true }, () => {
        const usersFetched: Array<ChannelUser> = [
          {
            userId: 1,
            imageUrl: 'https://secure.gravatar.com/avatar/63dd69ea790eabb4d9749c6319d9e3db',
            name: 'Daniel Ortíz',
            subtitle: 'Developer',
          },
          {
            userId: 2,
            imageUrl: 'https://en.gravatar.com/userimage/99865362/7a4f603f40dfda0ae6e731aa799f455c.png',
            name: 'GRVTY Digital',
            subtitle: 'Development Agency',
          },
        ];

        const usersClean = usersFetched.reduce((acc, user) => {
          const ret = { ...acc };
          ret[user.userId] = {
            ...user,
            initials: getNameInitials(user.name),
            color: getNameColor(user.name),
          };
          return ret;
        }, {});

        this.setState({ users: usersClean, refreshing: false });
      });
    }
  }

  /*
   * Simple function to render a separator between all the items
   * inside the FlatList..
   * @returns {any} A React View instance
   */
  renderSeparator() {
    return (
      <View style={this.style.separator} />
    );
  }

  /*
   * Function to render the footer of the Channel. In this section
   * an ActivityIndicator will be rendered when the refreshing prop is passed.
   * @returns {any} A React View instance
   */
  renderHeader() {
    return (
      <View style={this.style.headerWrapper}>
        { this.state.refreshing
          ? <ActivityIndicator animating size='large' />
          : null
        }
      </View>
    );
  }

  /*
   * Function intended to redirect to the correct render method of the current
   * message. We do this to maintain the code required for the System's messages
   * and the users' messages as separated and clean as possible.
   */
  renderMessage(itemData: { item: ChannelMessage }) {
    const { myUserId, systemUserId, messageStyle } = this.props;
    const item = itemData.item;
    const user = this.state.users[item.userId] || {
      userId: 0,
      name: '?',
      initials: '?',
      color: '#6f8eb4',
    };
    return (
      <Message
        style={messageStyle}
        myUserId={myUserId}
        systemUserId={systemUserId}
        item={item}
        user={user}
      />
    );
  }

  /*
   * Function to render the footer of the Channel. In this section
   * an ActivityIndicator will be rendered when the refreshing prop is passed.
   * @returns {any} A React View instance
   */
  renderFooter() {
    return (
      <View style={this.style.footerWrapper}>
        { this.state.refreshing
          ? <ActivityIndicator animating size='large' />
          : null
        }
      </View>
    );
  }

  render() {
    const { text } = this.state;
    const { inputbarStyle, actionIcon, sendIcon, extraAction } = this.props;
    return (
      <View style={this.style.wrapper}>
        <FlatList
          style={this.style.listWrapper}
          data={this.state.messages}
          extraData={this.state.users}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMessage}
          inverted

          refreshing={this.state.refreshing}

          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}

        />
        <Inputbar
          showSend={!!text}
          onChangeText={txt => this.setState({ text: txt })}
          text={text}
          style={inputbarStyle}
          actionIcon={actionIcon}
          sendIcon={sendIcon}
          extraAction={extraAction}
        />
      </View>
    );
  }
}
