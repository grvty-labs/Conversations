// @flow
import * as React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import SendIcon from '../../assets/svgSendIcon';
import defaultStyle, { fallbackStyle } from '../../styles/inputbar';

type Props = {
  showSend?: boolean,
  text: string,
  style?: ViewPropTypes.style,
  onChangeText: Function,
};
type Default = {
  showSend: boolean,
  style: ViewPropTypes.style,
};
type State = {
  showExtraIcons: boolean,
};

export default class Inputbars extends React.Component<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    showSend: true,
    style: defaultStyle,
  };

  constructor(props: Props) {
    super(props);
    (this: any).renderInputIcons = this.renderInputIcons.bind(this);
    this.style = {  // For flow and to prevent 'undefined key' issues
      ...fallbackStyle,
      ...props.style,
    };
  }

  state: State = {
    showExtraIcons: false,
  };

  /*
   * Function to render the footer of the Channel. In this section
   * an ActivityIndicator will be rendered when the refreshing prop is passed.
   * @returns {any} A React View instance
   */
  renderInputIcons() {
    const { showExtraIcons } = this.state;

    if (!showExtraIcons) {
      return (
        <View style={this.style.iconButtonWrapper}>
          <TouchableOpacity
            style={[this.style.iconButtonWrapper, this.style.openExtraIconsButtonIconWrapper]}
            onPress={() => this.setState({ showExtraIcons: !showExtraIcons })}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={this.style.iconButtonWrapper}>
        <TouchableOpacity
          style={[this.style.iconButtonWrapper, this.style.openExtraIconsButtonIconWrapper]}
          onPress={() => this.setState({ showExtraIcons: !showExtraIcons })}
        >
          <SendIcon />
        </TouchableOpacity>
        <View style={[this.style.iconButtonWrapper, this.style.attachmentButtonIconWrapper]}>
          <SendIcon />
        </View>
        <View style={[this.style.iconButtonWrapper, this.style.voiceButtonIconWrapper]}>
          <SendIcon />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={this.style.wrapper}>
        { this.renderInputIcons() }
        <TextInput
          underlineColorAndroid='transparent'
          style={this.style.input}
          onChangeText={this.props.onChangeText}
          value={this.props.text}
          placeholder={'Write your message...'}
          placeholderColor={'#797979'}
        />
        <TouchableOpacity style={[
          this.style.iconButtonWrapper,
          this.style.sendButtonIconWrapper,
          this.props.showSend ? { width: 40 } : { width: 0 }]}
        >
          <SendIcon />
        </TouchableOpacity>
      </View>
    );
  }
}
