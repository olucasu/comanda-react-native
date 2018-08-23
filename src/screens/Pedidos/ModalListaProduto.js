import React, {Component} from 'react';
import {Text,View,TouchableOpacity, StatusBar, FlatList, Button} from 'react-native';
import Modal from 'react-native-modal';
import ListaProduto from './ListaProduto';
import {styles} from '../../components/Styles'
export default class ModalListaProduto extends Component {

    state = {
        isVisible: false
    }


    render(){
        this.state.isVisible = this.props.modalIsVisible;
        return(
            <View style={{ flex: 1 }}>
        
                <Modal useNativeDriver={true} onRequestClose={ () => this.props._closeModal()}  isVisible={this.props.modalIsVisible}>
                    <StatusBar
                        backgroundColor="#000"
                        barStyle="dark-content"
                    />
                    <View style={[styles.container, styles.containerBorder]}>
                        <View style={styles.viewHeader}>
                            <Text style={[styles.viewHeaderText, styles.fontSemiBold]} > {this.props.categoriaSelecionada.grupo_descricao}  </Text>
                        </View>
                        <ListaProduto _closeModal={this.props._closeModal} modalIsVisible={this.state.isVisible} categoria={this.props.categoriaSelecionada} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity  activeOpacity={0.9} style={[styles.button,styles.buttonSecondary]}  onPress={this.props._closeModal}>
                                <Text style={styles.buttonDarkText}>
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </View>
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