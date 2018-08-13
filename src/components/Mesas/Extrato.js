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
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Details', itemParams)}>
                      <Text>{item.id}</Text>
                      <Text>{item.descricao}</Text>
                      <Text>{item.total_item}</Text>
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