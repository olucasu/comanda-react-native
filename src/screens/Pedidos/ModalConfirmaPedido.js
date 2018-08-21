import React, {Component} from 'react';
import {Text,View,TouchableOpacity, StatusBar, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from '../../components/Styles';
import Pedido from './Pedido';

export default class ModalConfirmaPedido extends Component {

    state = {
        isVisible: false
    }

    _closeModal = () =>
        this.props.modalIsVisible =  false


    _enviarPedidoButton = () =>{
        if(this.props.pedido.length > 0) {
            return(
                <TouchableOpacity  activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]}onPress={ () => { this.props._closeModal() ;this.props._enviarPedido() } }>
                <Text style={styles.buttonLightText}>
                    Enviar Pedido
                </Text>
             </TouchableOpacity>
            )
        }
   
    }

  

    render(){
        this.state.isVisible = this.props.modalIsVisible;

        return(
            <View style={{ flex: 1 }}>
        
                <Modal useNativeDriver={true} onRequestClose={ () => this.props._closeModal()}  style={{backgroundColor:"#fff", height:200, justifyContent: 'center'}} isVisible={this.props.modalIsVisible}>
                    <StatusBar
                        backgroundColor="#000"
                        barStyle="dark-content"
                    />
                    <Pedido pedido={this.props.pedido} />
                    <View style={[styles.buttonContainer, styles.buttonContainerRow]}>
                        <TouchableOpacity  activeOpacity={0.9} style={[styles.button,styles.buttonSecondary]} onPress={this.props._closeModal}>
                            <Text style={styles.buttonDarkText}>
                                Voltar
                            </Text>
                        </TouchableOpacity>
                        {this._enviarPedidoButton()}
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