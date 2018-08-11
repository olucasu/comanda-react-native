import React from 'react';
import {Icon} from 'native-base';
import {Colors,styles} from '../../components/Styles';


const getIconMesa = (tipoMesa) => {
    
    let type, name;

    switch(tipoMesa) {
        case 'OCUPADA(O)':
            type = 'MaterialIcons';
            name = 'block'
            break;
        case 'CONTA':
            type = 'EvilIcons';
            name = 'like';
            break;
        case 'RESERVADA(O)':
            type = 'MaterialCommunityIcons';
            name = 'pencil';
            break;
        case 'LIVRE':
            type = 'MaterialIcons';
            name = 'check';
            break;
        default:
            type = 'MaterialIcons';
            name = 'credit-card';
      }

    return <Icon name={name} type={type} style={styles.tableCardText} /> 
} 

export {getIconMesa}