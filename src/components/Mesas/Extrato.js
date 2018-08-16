import React , {Component} from 'react';
import {FlatList, Text,View, TouchableOpacity} from 'react-native';

export default class Extrato extends Component{

    render(){
        if(this.props.extrato != null) {
            return(
                <FlatList 
                keyExtractor={(item, index) => index.toString()}
                data={this.props.extrato}
                numColumns={1}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity>
                      <Text>Código: {item.id}</Text>
                      <Text>Descrição: {item.descricao}</Text>
                      <Text>Total: {item.total_item}</Text>
                      <Text>Quantidade: {item.qtde_item}</Text>
                      <Text>Complemento: {item.complemento}</Text>

                    </TouchableOpacity>
                  )
                }}
              />
            )
        } else {
            return(
                <View>
                    <Text>Nenhum Consumo</Text>
                </View>
            )
        }
    }
}