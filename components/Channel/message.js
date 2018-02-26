// @flow
import * as React from 'react';
import {
  Text,
  Image,
  View,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import 'moment-timezone';
import SendIcon from '../../assets/svgSendIcon';
import defaultStyle, { fallbackStyle } from '../../styles/message';
import type { ChannelMessage, ChannelUser } from '../../flowTypes';

type Props = {
  myUserId: number | string,
  systemUserId: number | string,
  item: ChannelMessage,
  list: Array<ChannelMessage>,
  user: ChannelUser,
  style?: ViewPropTypes.style,
  onImageTap: Function,
};
type Default = {
  style: ViewPropTypes.style,
  onImageTap: Function,
};
type State = {};

// const list = [
//   {
//     description: ':O hat etc',
//     imageUrl: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14276382_1737295453196749_1335762274_n.jpg?ig_cache_key=MTMzNDMzMDE3NTk0MDQyMDQ4Ng%3D%3D.2',
//   },
//   {
//     imageUrl: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e15/14448401_926765740761369_3613737894616760320_n.jpg?ig_cache_key=MTM0NDQ0OTEzNDI0OTIxMzgzNA%3D%3D.2',
//     description: 'wood',
//     width: 640,
//     height: 640,
//   },
//   {
//     imageUrl: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14272256_1576830565957175_619863550_n.jpg?ig_cache_key=MTMzOTMwNzg3OTc3NzI1MTQzMA%3D%3D.2',
//     description: 'making beer etc',
//     width: 640,
//     height: 640,
//   },
// ];

export default class Message extends React.PureComponent<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    style: defaultStyle,
    onImageTap: () => {},
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

  view = null;

  /*
   * Function intended to render a single message from the list of messages pulled.
   * This function will only render the system's messages.
   */
  renderMessageAsSystem(item: ChannelMessage) {
    return (
      <View style={this.style.messageRow}>
        <View style={[this.style.messageBase, this.style.messageFromSystem]}>
          <Text style={[this.style.textMessage, this.style.systemText]}>{ item.text }</Text>
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
    const { user: userData, onImageTap, myUserImage, otherUserImage } = this.props;

    const time = moment(item.date).subtract(6, 'hours').format('LT');

    let source = (typeof otherUserImage === 'number') ? otherUserImage : { uri: otherUserImage };
    if (isMine) {
      source = (typeof myUserImage === 'number') ? myUserImage : { uri: myUserImage };
    }

    return (
      <View style={[
        this.style.messageRow,
        isMine
          ? this.style.messageRowRight
          : this.style.messageRowLeft]}
      >
        {
          item.profileImage
          ? <Image
            style={this.style.userIcon}
            source={item.profileImage}
          />
          : <Image
            style={this.style.userIcon}
            source={source}
          />
        }
        <View
          style={[
            this.style.messageBase,
            isMine ? this.style.messageFromMe : this.style.messageFromOther]}
        >
          {
            item.name && !isMine
            ? <Text
              style={[
                this.style.textMessage,
                isMine ? this.style.userText : this.style.otherText,
                { color: '#787878' }
              ]}
            >
              { item.name }
            </Text>
            : null
          }
          {
            (item.attachmentUrl !== '')
            ? (
              <Image
                ref={(view) => { this.view = view; }}
                source={{ uri: item.attachmentUrl }}
                style={{ height: 80, width: 80 }}
              />
            )
            : null
          }
          <Text
            style={[this.style.textMessage, isMine ? this.style.userText : this.style.otherText]}
          >
            { item.text }
          </Text>
          <View style={{ flex: 1, paddingTop: 8, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ color: '#999', fontSize: 10 }}>{time}</Text>
          </View>
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
