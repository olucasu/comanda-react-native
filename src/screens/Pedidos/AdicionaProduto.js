import React, {Component} from  'react';
import {Text,View} from 'react-native';
import {styles} from '../../components/Styles'
import {Container} from 'native-base'

import {NumberPicker} from '../../components/Helpers/uiHelper';
export default class AdicionaProduto extends Component{

    constructor(props){
        super(props);

        const produto =  props.navigation.getParam('produto', 'Não informado');
        this.state ={
            produto: produto,
            qtde: 0,
            complemento: '',
            pvenda: '',
            id: produto.id_produto
        }
    }


    adicionaItemPedido(){
    }

    render(){
        console.dir(this.state);
        return(
            <Container style={styles.container}>
                <NumberPicker />
                <View>
                    <Text>{this.state.produto.produto_descricao}</Text>

                </View>
            </Container>
        
       
        )
    }
}