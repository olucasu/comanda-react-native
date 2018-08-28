import React , {Component} from 'react';
import {FlatList, Text,View, ScrollView, RefreshControl} from 'react-native';
import { styles } from '../Styles';
import EmptyResult from '../../components/Helpers/EmptyResult';
import {_formatMoney} from '../../components/Helpers/uiHelper';

export default class Extrato extends Component{
   
   
    state={
        refreshing:false
    }

    
    render(){
        if(this.props.extrato != null) {
            return(
                <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.contentTitle}> 
                            Extrato
                        </Text>    
                    </View>
                    <FlatList 
                    style={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.extrato}
                    numColumns={1}
                    renderItem={({ item }) => {

                    return (
                        <View style={styles.listItem}>
                            <View style={{flex:1 }}>
                                <Text style={[styles.listItemTitle, styles.fontSemiBold]}>{item.id_produto} - {item.descricao}</Text>
                                {/* <Text style={styles.text}>Código: </Text> */}
                                <Text style={styles.text}>Qtd: {item.qtde_item}</Text>
                            </View>
                            <View style={{flex:1,justifyContent:'flex-end', flexDirection: 'row' }}>
                                 <Text style={styles.text}>Subtotal: R${_formatMoney(item.total_item)}</Text>
                            </View>
                        </View>
                    )
                    }}
                    />
                </ScrollView>
            
            )
        } else {
            return(
                <EmptyResult message="Não há consumo." />
            )
        }
    }
}