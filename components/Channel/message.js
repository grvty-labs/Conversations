// @flow
import * as React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import SendIcon from '../../assets/svgSendIcon';
import defaultStyle, { fallbackStyle } from '../../styles/message';
import type { ChannelMessage, ChannelUser } from '../../flowTypes';

type Props = {
  myUserId: number | string,
  systemUserId: number | string,
  item: ChannelMessage,
  user: ChannelUser,
  style?: ViewPropTypes.style,
};
type Default = {
  style: ViewPropTypes.style,
};
type State = {};

export default class Message extends React.PureComponent<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    style: defaultStyle,
  };
  constructor(props: Props) {
    super(props);
    (this: any).renderMessageAsSystem = this.renderMessageAsSystem.bind(this);
    (this: any).renderMessageAsUser = this.renderMessageAsUser.bind(this);
    this.style = {  // For flow and to prevent 'undefined key' issues
      ...fallbackStyle,
      ...props.style,
    };
  }

  /*
   * Function intended to render a single message from the list of messages pulled.
   * This function will only render the system's messages.
   */
  renderMessageAsSystem(item: ChannelMessage) {
    return (
      <View style={this.style.messageRow}>
        <View style={[this.style.messageBase, this.style.messageFromSystem]}>
          <Text style={{ color: '#000000', textAlign: 'center' }}>{ item.text }</Text>
        </View>
      </View>
    );
  }

  /*
   * Function intended to render a single message from the list of messages pulled.
   * This function will render the users' messages. If it is a message from the connected
   * user, it will be rendered with a slightly different style.
   */
  renderMessageAsUser(item: ChannelMessage, isMine: boolean) {
    const { user: userData } = this.props;

    return (
      <View style={[
        this.style.messageRow,
        isMine
          ? this.style.messageRowRight
          : this.style.messageRowLeft]}
      >
        { userData.imageUrl
          ? (
            <Image
              style={this.style.userIcon}
              source={{ uri: userData.imageUrl }}
            />
          )
          : (
            <Text style={[
              this.style.userIcon,
              this.style.userIconText,
              { backgroundColor: userData.color }]}
            >
              { userData.initials }
            </Text>
          )
        }
        <View
          style={[
            this.style.messageBase,
            isMine ? this.style.messageFromMe : this.style.messageFromOther]}
        >
          <Text style={isMine ? { color: '#ffffff' } : { color: '#000000' }}>
            { item.text }
          </Text>
        </View>
      </View>
    );
  }

  /*
   * Function intended to redirect to the correct render method of the current
   * message. We do this to maintain the code required for the System's messages
   * and the users' messages as separated and clean as possible.
   */
  render() {
    const { myUserId, systemUserId, item } = this.props;
    if (systemUserId === item.userId) {
      return this.renderMessageAsSystem(item);
    }
    return this.renderMessageAsUser(item, myUserId === item.userId);
  }
}
