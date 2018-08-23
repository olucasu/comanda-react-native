import React, {Component} from 'react';
import {Text,View,TouchableOpacity, StatusBar, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from '../../components/Styles';
import Pedido from './Pedido';
import {Container} from 'native-base';

export default class ModalConfirmaPedido extends Component {

    constructor(props){
        super(props)

        this.updateModal = this.updateModal.bind(this);
    }

    state = {
        isVisible: false
    }

    _closeModal = () =>
        this.props.modalIsVisible =  false


    _confirmEnviarPedido = () =>{
        return Alert.alert(
            'Tudo Certo?',
            'Você irá enviar o pedido.',
            [
              {text: 'Ok, enviar', onPress: () => { this.props._enviarPedido() ; this.props._closeModal()}},
              {text: 'Cancelar', onPress: () =>  false},
            ],
            { cancelable: false }
          )
    }

    _enviarPedidoButton = () =>{
        if(this.props.pedido.length > 0) {
            return(
                <View style={[styles.buttonContainer]}>
                <TouchableOpacity  activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]}onPress={ () => { this._confirmEnviarPedido() } }>
                <Text style={styles.buttonLightText}>
                    Enviar Pedido
                </Text>
             </TouchableOpacity>
             </View>
            )
        }
   
    }

    updateModal(){
        this.forceUpdate();
    }

    _getValorPedido = () => {
        if (this.props.pedido != null && this.props.pedido.length > 0) {

            let valor = 0
            
            this.props.pedido.map(item => (valor += item.vlr_vendido * item.qtde))
       
            valor = parseFloat(Math.round(valor * 100) / 100).toFixed(2)
       
            return(
                <View style={styles.viewHeader}>
                    <Text style={[styles.viewHeaderText, styles.fontSemiBold]}>
                        Pedido - {this.props.mesa} | Total: R$ {valor}
                    </Text>
                </View>
            )
        }
    }

    render(){

        this.state.isVisible = this.props.modalIsVisible;

        return(
        
                <Modal   useNativeDriver={true} onRequestClose={ () => this.props._closeModal()}  isVisible={this.props.modalIsVisible}>
                    <StatusBar
                        backgroundColor="#000"
                        barStyle="dark-content"
                    />
              
                    <View style={[styles.container, styles.containerBorder]}>
                        {this._getValorPedido()}
                        <Pedido update={this.updateModal} pedido={this.props.pedido} />
                        <View style={styles.buttonGroup}>
                            {this._enviarPedidoButton()}
                            <View style={[styles.buttonContainer]}>
                                <TouchableOpacity  activeOpacity={0.9} style={[styles.button, styles.buttonSecondary]} onPress={this.props._closeModal}>
                                    <Text style={styles.buttonDarkText}>
                                        Voltar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
           
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