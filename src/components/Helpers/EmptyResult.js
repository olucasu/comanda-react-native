import React, { Component } from 'react'
import {View, Text} from 'react-native';
import {Icon} from 'native-base'
import { styles } from '../Styles'
class emptyResult extends Component {
  render () {
    return (
      <View style={[styles.container, styles.alignItemsCenter]}>
            <Icon style={styles.iconHeroMessage} type="MaterialCommunityIcons" name="food-off" size={54} />
            <Text style={styles.text}> {this.props.message} </Text>
      </View>
    )
  }
}

export default emptyResult;
