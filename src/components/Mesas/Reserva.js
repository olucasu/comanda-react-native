import React from 'react';
import { Text,View} from 'react-native';
import { styles } from '../Styles';
import EmptyResult from '../../components/Helpers/EmptyResult';

/**
 * 
 * @param {*} props 
 * 
 * Componente Reserva
 * 
 * Retorna as informações pertinentes a reserva da Mesa.
 * 
 
 */
const Reserva = (props) =>{

    if(! props.reserva) return(<EmptyResult message="Não consegui encontrar as informações da reserva" />)

    return(
        <View style={styles.listItem}>
            <View style={{flex:1 }}>
                <Text style={styles.text}>Titular: {props.reserva.reserva_nome}</Text>
            </View>
            <View style={{flex:1 }}>
                <Text style={styles.text}>Telefone: {props.reserva.reserva_hora}</Text>
            </View>
            <View style={{flex:1 }}>
                <Text style={styles.text}>Nº de Pessoas: {props.reserva.reserva_pessoas}</Text>
            </View>
            <View style={{flex:1 }}>
                <Text style={styles.text}>Telefone: {props.reserva.reserva_fone}</Text>
            </View>
           
        </View>
    )
}

export default Reserva;

