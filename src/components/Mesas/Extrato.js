import React , {Component} from 'react';
import {FlatList, Text,View, TouchableOpacity} from 'react-native';
import { styles } from '../Styles';
import { ListItem } from 'native-base';

export default class Extrato extends Component{

    render(){
        if(this.props.extrato != null) {
            return(
              
                <FlatList 
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                data={this.props.extrato}
                numColumns={1}
                renderItem={({ item }) => {

                  return (
                    <View style={styles.listItem}>
                      <Text style={styles.listItemTitle}>{item.descricao}</Text>
                      <Text style={styles.text}>Código: {item.id}</Text>
                      <Text style={styles.text}>Qtd: {item.qtde_item}</Text>
                    </View>
                  )
                }}
              />
            )
        } else {
            return(
                <View style={[styles.container, styles.horizontal]}>
                    <Text>Nenhum Consumo</Text>
                </View>
            )
        }
    }
}