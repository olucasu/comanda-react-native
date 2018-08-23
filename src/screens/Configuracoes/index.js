import React, { Component } from 'react';
import {StatusBar} from 'react-native';
import {styles, Colors} from '../../components/Styles';
import {
  Container,
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Button,
} from 'native-base'


export default class Configuracoes extends Component {
  render () {
    return (
      <Container>
         <StatusBar
            backgroundColor={Colors.primary.containerColor}
            barStyle={Colors.primary.barStyle}
        />
        <Content>
          <ListItem icon onPress={()=> this.props.navigation.navigate('ConfigurarUrlServer')}>
            <Left>
              <Button transparent>
                <Icon style={styles.icon} type="Feather"  name='server' />
              </Button>
            </Left>
            <Body>
              <Text style={styles.text}>Endereço (URL) do servidor.</Text>
            </Body>
            <Right>
                 <Icon active name='arrow-forward' />
            </Right>
          </ListItem>
        </Content>
      </Container>
    )
  }
}
