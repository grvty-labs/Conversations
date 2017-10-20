// @flow
import * as React from 'react';
import {
  FlatList,
  View,
  ViewPropTypes,
  ActivityIndicator,
} from 'react-native';
import ListItem from './ListItem';

import defaultStyle from '../styles/List';
import type { ListStorePropTypes, ListActionPropTypes } from '../flowTypes';

type Props =
  & ListStorePropTypes
  & ListActionPropTypes;
type Default = {
  ItemComponent: ReactClass<*>,
  itemsData: Array<{
    [key: string]: string | number }>,
  style: ViewPropTypes.style,
  refreshing: boolean,
};
type State = {
  refreshing: boolean,
};

/**
 * A conversations list
 */
export default class List extends React.Component < Default, Props, State > {
  style: ViewPropTypes.style;
  static defaultProps: Default = {
    ItemComponent: ListItem,
    itemsData: [],
    style: defaultStyle,
    refreshing: false,
  };

  constructor(props: Props) {
    super(props);
    (this: any).fetchItemsList = this.fetchItemsList.bind(this);
    (this: any).keyExtractor = this.keyExtractor.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderItem = this.renderItem.bind(this);
    (this: any).renderSeparator = this.renderSeparator.bind(this);

    this.style = {  // For flow and to prevent 'undefined key' issues
      wrapper: {},
      separator: {},
      footerWrapper: {},
      ...props.style,
    };
  }

  state: State = {
    refreshing: this.props.refreshing || false,
  };

  componentDidMount() {}
  componentWillMount() {}

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ refreshing: nextProps.refreshing });
  }

  /*
   * Function executed every single time a fetch is executed. The fetch's
   * purpose is to pull a part of the items to be rendered.
   */
  fetchItemsList() {
    const { fetchItemsList } = this.props;
    if (fetchItemsList) {
      fetchItemsList();
    }
  }

  /*
   * Extract the item's key for the list render. The key must be a
   * string and  unique in the whole list. This function is executed over
   * all items of the itemsData list.
   * @param {any} item A single item inside the itemsData list
   * @returns {string} The new key for the list of React objects
   */
  keyExtractor = (item: *) => `${item.id}`

  /*
   * Function used to render each one of the items inside the
   * itemsData list.
   * @param {any} itemData A single item inside the itemsData list
   * @returns {any} The React instance
   */
  renderItem(itemData: { item: any }) {
    const { ItemComponent, itemStyle, onPressItem } = this.props;
    return (
      <ItemComponent
        style={itemStyle}
        onPress={onPressItem}
        {...itemData.item}
      />
    );
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
   * Function to render the footer of the FlatList. In this section
   * an ActivityIndicator will be rendered when the refreshing prop is passed.
   * @returns {any} A React View instance
   */
  renderFooter = () => {
    if (!this.state.refreshing) {
      return null;
    }

    return (
      <View style={this.style.footerWrapper}>
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  render() {
    const { itemsData } = this.props;
    return (
      <FlatList
        style={this.style.wrapper}
        data={itemsData}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}

        refreshing={this.state.refreshing}
        onRefresh={this.fetchItemsList}

        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}
