import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native'
import Modal from 'react-native-modal'

import {
    createMaterialTopTabNavigator,
  } from 'react-navigation'

class MesaProdutoModal extends Component {


    state = {
        modalVisible : this.props.modalVisible ?  this.props.modalVisible : false
    }

    toggleModal = () => {
        const visibility = !this.state.modalVisible
        this.setState({ modalVisible: visibility })
    }

    render () {
    return (
      <Modal isVisible={this.state.modalVisible}>
        <View style={styles.modalInner}>
          <Text>Hello!</Text>
          <Button title='Fechar' onPress={this.toggleModal} />
        </View>
      </Modal>
    )
  }
}

const ModalWithNav =  createMaterialTopTabNavigator({
    Produto : {
        screen: MesaProdutoModal
    }
})

var styles = StyleSheet.create({
    modalInner: {
      backgroundColor: '#fff',
      height: '100%'
    }
  })
  
export default ModalWithNav;