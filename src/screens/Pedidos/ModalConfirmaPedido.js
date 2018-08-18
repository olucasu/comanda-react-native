import React, {Component} from 'react';
import {Text,View,TouchableOpacity, StatusBar, FlatList, Button} from 'react-native';
import Modal from 'react-native-modal';

export default class ModalConfirmaPedido extends Component {

    state = {
        isVisible: false
    }

    _closeModal = () =>
        this.props.modalIsVisible =  false

    render(){
        this.state.isVisible = this.props.modalIsVisible;
        return(
            <View style={{ flex: 1 }}>
        
                <Modal useNativeDriver={true} onRequestClose={ () => this.props._closeModal()}  style={{backgroundColor:"#fff", height:200, justifyContent: 'center'}} isVisible={this.props.modalIsVisible}>
                    <StatusBar
                        backgroundColor="#000"
                        barStyle="dark-content"
                    />
                    <View style={{ flex: 1 }}>
                        <Text>Pedido</Text>

                          <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={this.props.pedido}
                            renderItem={({item}) => {
                                
                                console.log(item);
                                return(
                                    <TouchableOpacity><Text style={{padding:20, backgroundColor:"#eee",fontSize:18 }}>{item.descricao}</Text></TouchableOpacity>
                                )
                            }}
                        />

                        <Button title="Voltar para a Lista"  style={{backgroundColor:'#eee'}} onPress={this.props._closeModal} />
                        <Button title="Enviar Pedido"  onPress={ () => { this.props._closeModal() ;this.props._enviarPedido() } } />

                             
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