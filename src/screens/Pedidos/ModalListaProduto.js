import React, {Component} from 'react';
import {Text,View,TouchableOpacity, StatusBar, FlatList, Button} from 'react-native';
import Modal from 'react-native-modal';
import ListaProduto from './ListaProduto';
export default class ModalListaProduto extends Component {

    state = {
        isVisible: false
    }


    render(){
        this.state.isVisible = this.props.modalIsVisible;
        return(
            <View style={{ flex: 1 }}>
        
                <Modal useNativeDriver={true} onRequestClose={ () => this.props._closeModal()} style={{backgroundColor:"#fff", height:200, justifyContent: 'center'}} isVisible={this.props.modalIsVisible}>
                    <StatusBar
                        backgroundColor="#000"
                        barStyle="dark-content"
                    />
                    <View style={{ flex: 1 }}>
                        <Text>Produtos</Text>
                        <ListaProduto _closeModal={this.props._closeModal} modalIsVisible={this.state.isVisible} categoria={this.props.categoriaSelecionada} />
                        <Button title="Voltar para a Lista"  style={{backgroundColor:'#eee'}} onPress={this.props._closeModal} />
                    </View>
                </Modal>
            </View>
           
        )
    }
}


// qtde: 1,
// id_produto: produto.id_produto,
// complemento:"",
// vlr_vendido: String(produto.pvenda),
// estoque: String(produto.saldo_geral),
// desricao: produto.produto_descricao,
// unidade: produto.unidade,