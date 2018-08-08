import React, { Component } from 'react'
import {View, ActivityIndicator} from 'react-native';

import { styles, Colors } from '../styles'
class Loader extends Component {
  render () {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color={Colors.secondaryColor} />
      </View>
    )
  }
}

export default Loader
