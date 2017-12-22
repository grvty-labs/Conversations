// @flow
import * as React from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { em } from '../../styles';
import SendIcon from '../../assets/svgSendIcon';
import defaultStyle, { fallbackStyle } from '../../styles/inputbar';

type Props = {
  actionIcon?: React.Node,
  sendIcon?: React.Node,
  style?: ViewPropTypes.style,
  extraAction?: Function, // The action to be executed from the action Button
  sendAction: Function, // The send Action
  imageSelected: string,
};
type Default = {
  showSend: boolean,
  style: ViewPropTypes.style,
  actionIcon?: React.Node,
  sendIcon?: React.Node,
  sendAction: Function,
  imageSelected: string,
};
type State = {
  showExtraIcons: boolean,
  text: string,
};

export default class Inputbars extends React.Component<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    showSend: true,
    style: defaultStyle,
    actionIcon: <SendIcon />,
    sendIcon: <SendIcon />,
    sendAction: () => {},
    imageSelected: '',
  };

  constructor(props: Props) {
    super(props);
    (this: any).renderInputIcons = this.renderInputIcons.bind(this);
    (this: any).onImageSelectedfocusInput = this.onImageSelectedfocusInput.bind(this);
    this.style = {  // For flow and to prevent 'undefined key' issues
      ...fallbackStyle,
      ...props.style,
    };
  }

  state: State = {
    showExtraIcons: false,
    text: '',
  };

  componentWillReceiveProps(nextProps: Object) {
    this.onImageSelectedfocusInput(nextProps);
  }

  /*
   * Function to render the footer of the Channel. In this section
   * an ActivityIndicator will be rendered when the refreshing prop is passed.
   * @returns {any} A React View instance
   */
  renderInputIcons() {
    const { actionIcon, extraAction } = this.props;
    const { showExtraIcons } = this.state;

    if (!showExtraIcons) {
      return (
        <View style={this.style.iconButtonWrapper}>
          <TouchableOpacity
            style={[this.style.iconButtonWrapper, this.style.openExtraIconsButtonIconWrapper]}
            // onPress={() => extraAction || this.setState({ showExtraIcons: !showExtraIcons })}
            onPress={extraAction}
          >
            {actionIcon}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={this.style.iconButtonWrapper}>
        <TouchableOpacity
          style={[this.style.iconButtonWrapper, this.style.openExtraIconsButtonIconWrapper]}
          onPress={extraAction}
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

  renderPreview() {
    const { imageSelected } = this.props;
    const source = (imageSelected && (typeof imageSelected === 'string'))
      ? { uri: `data:image/png;base64,${imageSelected}` }
      : { uri: '' };

    if (imageSelected !== '') {
      return (
        <View style={this.style.preview}>
          <Image source={source} style={this.style.previewImage} />
        </View>
      );
    }
    return null;
  }

  textInput = null;

  onImageSelectedfocusInput(nextProps: Object) {
    const { imageSelected } = nextProps;
    if (this.textInput && imageSelected !== '') this.textInput.focus();
  }

  render() {
    const { sendIcon, sendAction, imageSelected } = this.props;

    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={em(5.58)}>
        <View>
          { this.renderPreview() }
          <View style={this.style.wrapper}>
            { this.renderInputIcons() }
            <TextInput
              underlineColorAndroid='transparent'
              style={this.style.input}
              onChangeText={txt => this.setState({ text: txt })}
              value={this.state.text}
              placeholder={(imageSelected === '') ? 'Escribe tu mensaje...' : 'Añade un titulo...'}
              autoFocus={imageSelected !== ''}
              ref={(ref) => { this.textInput = ref; }}
              withRef
              placeholderColor={'#797979'}
            />
            {
              this.state.text !== ''
              ? (<TouchableOpacity
                style={
                [
                  this.style.iconButtonWrapper,
                  this.style.sendButtonIconWrapper,
                ]
              }
                onPress={() => { sendAction(this.state.text, imageSelected); this.setState({ text: '' }); }}
              >
                {sendIcon}
              </TouchableOpacity>)
              : null
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
