// @flow
import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import defaultStyle from '../styles/ListItem';
import type { ListItemPropTypes } from '../flowTypes';

type Props = ListItemPropTypes;
type Default = {
  subtitle: string,
  extra: ReactClass<*> | null,
  style: ViewPropTypes.style,
};
type State = {};

/**
 * A conversations list item
 */
export default class ListItem extends React.PureComponent<Default, Props, State> {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    subtitle: '',
    extra: null,
    style: defaultStyle,
  };

  constructor(props: Props) {
    super(props);
    (this: any).onPress = this.onPress.bind(this);

    this.style = {  // For flow and to prevent 'undefined key' issues
      wrapper: {},
      iconWrapper: {},
      icon: {},
      textWrapper: {},
      titleText: {},
      subtitleText: {},
      extraWrapper: {},
      ...props.style,
    };
  }

  state: State = {};

  componentDidMount() {}
  componentWillMount() {}

  /*
   * Function executed every single time a Press is executed over the item.
   * This function executes some internal code, and ends executing the
   * onPress prop that is passed from the List which contains the Item
   */
  onPress = () => {
    this.props.onPress(this.props.id);
  };

  render() {
    const {
      icon, title, subtitle, extra,
    } = this.props;

    return (
      <TouchableOpacity style={this.style.wrapper} onPress={this.onPress}>
        <Image
          style={this.style.icon}
          source={{ uri: icon }}
        />
        <View style={this.style.textWrapper}>
          <Text style={this.style.titleText}>{title}</Text>
          <Text style={this.style.subtitleText}>{subtitle}</Text>
        </View>
        <View style={this.style.extraWrapper}>
          {extra}
        </View>
      </TouchableOpacity>
    );
  }
}
