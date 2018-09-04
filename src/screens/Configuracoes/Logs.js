import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base'

import {styles, Colors} from '../../components/Styles';
class Logs extends Component {

  constructor(props){
    super(props)
  }

  render () {
    return (
      <Container style={styles.container}>
           <StatusBar
            backgroundColor={Colors.primary.containerColor}
            barStyle={Colors.primary.barStyle}
        />
        <Content style={styles.content}>
            <Text>Logs</Text>
        </Content>
      </Container>
    )
  }
}

export default Logs
