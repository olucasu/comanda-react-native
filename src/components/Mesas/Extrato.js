import React , {Component} from 'react';
import {FlatList, Text,View, TouchableOpacity} from 'react-native';
import { styles } from '../Styles';
import { ListItem } from 'native-base';

export default class Extrato extends Component{
    
    _getValorExtrato(){
        let valor = 0
        this.props.extrato.map(item =>  valor += item.total_item )
        return parseFloat(Math.round( valor * 100) / 100).toFixed(2)
       
    }

    render(){
        if(this.props.extrato != null) {
            return(
                <View style={styles.container}>
                    <View style={styles.viewHeader}>
                        <Text style={styles.viewHeaderText} > Comanda | Total: R$ {this._getValorExtrato()}</Text>
                    </View>
                    <FlatList 
                    style={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.extrato}
                    numColumns={1}
                    renderItem={({ item }) => {

                    return (
                        <View style={styles.listItem}>
                            <Text style={[styles.listItemTitle, styles.text]}>{item.descricao}</Text>
                            {/* <Text style={styles.text}>Código: {item.id}</Text> */}
                            <Text style={styles.text}>Qtd: {item.qtde_item}</Text>
                            <Text style={styles.text}>Valor: R${item.total_item}</Text>
                        </View>
                    )
                    }}
                    />
                </View>
            
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