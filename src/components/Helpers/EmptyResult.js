import React, { Component } from 'react'
import {View, Text} from 'react-native';
import {Icon} from 'native-base'
import { styles } from '../Styles'
class emptyResult extends Component {

  constructor(props){
    super(props);
    this.state = {
      iconName : typeof props.icon != 'undefined' && props.icon.iconName ? props.icon.iconName :  "food-off",
      iconType : typeof props.icon != 'undefined' && props.icon.iconType ? props.icon.iconType :  "MaterialCommunityIcons",
    }
  }

  render () {
    return (
      <View style={[styles.container, styles.alignItemsCenter]}>
          <Icon style={styles.iconHeroMessage} type={this.state.iconType} name={this.state.iconName} size={54} />
          <Text style={styles.text}> {this.props.message} </Text>
      </View>
    )
  }
}

export default emptyResult;
