import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base'
import { styles } from '../Styles'


/**
 * Componente de UI EmptyResult
 * 
 * props
 * 
 * icon(Object) = iconName and IconType
 * 
 * message - string
 * 
 * showUpdate - recebe uma função para atualizar o componente
 */
class emptyResult extends Component {

  constructor(props){
    super(props);
    this.state = {
      iconName : typeof props.icon != 'undefined' && props.icon.iconName ? props.icon.iconName :  "food-off",
      iconType : typeof props.icon != 'undefined' && props.icon.iconType ? props.icon.iconType :  "MaterialCommunityIcons",
    }
  }

  buttonUpdate(){
    if(this.props.showUpdate) {
      return(
        <TouchableOpacity onPress={()=> {this.props.showUpdate()}} style={[styles.button, styles.buttonSecondary, {marginTop: 15}]}>
          <Text style={styles.buttonDarkText}>Atualizar</Text>
        </TouchableOpacity>
      )
    }
  }
  
  render () {
    return (
      <View style={[styles.container, styles.alignItemsCenter, styles.containerBorder]}>
          <Icon style={styles.iconHeroMessage} type={this.state.iconType} name={this.state.iconName} size={54} />
          <Text style={styles.text}> {this.props.message} </Text>
          {this.buttonUpdate()}
      </View> 
    )
  }
}

export default emptyResult;
