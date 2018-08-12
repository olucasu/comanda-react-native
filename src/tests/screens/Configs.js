import React, { Component } from 'react'
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
        <Content>
          <ListItem icon onPress={()=> this.props.navigation.navigate('ConfigurarUrlServer')}>
            <Left>
              <Button transparent>
                <Icon type="Feather"  name='server' />
              </Button>
            </Left>
            <Body>
              <Text>Endereço (URL) do servidor.</Text>
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
