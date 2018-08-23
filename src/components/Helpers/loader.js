import React, { Component } from 'react'
import {View, ActivityIndicator} from 'react-native';

import { styles, Colors } from '../Styles'
class Loader extends Component {
  render () {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color={Colors.primary.lightColor} />
      </View>
    )
  }
}

export default Loader
