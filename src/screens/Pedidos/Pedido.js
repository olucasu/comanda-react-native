import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {styles} from "../../components/Styles";
const Pedido = (props) => {

    if( props.pedido.length > 0) {
        return(
            <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={props.pedido}
            renderItem={({item}) => {
                return(
                    <TouchableOpacity><Text style={{padding:20, backgroundColor:"#eee",fontSize:18 }}>{item.descricao}</Text></TouchableOpacity>
                )
            }}
        />
        )
    } else {
        return(
            <View>
                <Text>Pedido vazio</Text>
            </View>
        )
    }
 
 }

 export default Pedido