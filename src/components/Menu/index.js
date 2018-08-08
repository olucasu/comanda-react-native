import React, {Component} from 'react';
import {Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {styles} from '../styles'; 
export default class Menu extends Component {
  render() {
    
    const navigation = this.props.navigation;

    return (
     
        <Header style={styles.header} hasTabs={true}>
          <Left>
            <Button onPress={()=>navigation.openDrawer()} transparent>
              <Icon style={styles.headerIcon} name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerText}>{navigation.state.routeName}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon style={styles.headerIcon} name='more' />
            </Button>
          </Right>
        </Header>
      
    );
  }
}