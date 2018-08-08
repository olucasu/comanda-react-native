import React from 'react';
import {Icon} from 'native-base';
import {Colors,styles} from '../../components/styles';


const getIconMesa = (tipoMesa) => {
    
    let type, name;

    console.log(tipoMesa);

    switch(tipoMesa) {
        case 'OCUPADA(O)':
            type = 'EvilIcons';
            name = 'cart'
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
            name = 'favorite-border';
            break;
        default:
            type = 'MaterialIcons';
            name = 'credit-card';
      }

    return <Icon name={name} type={type} style={styles.tableCardText} /> 
} 

export {getIconMesa}