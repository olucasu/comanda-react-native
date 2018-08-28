import React, {Component} from  'react';
import {Text,View, ToastAndroid, TouchableOpacity, ScrollView} from 'react-native';
import {styles, Colors} from '../../components/Styles'
import {Container, Content} from 'native-base'
import {NumberPicker, _formatMoney} from '../../components/Helpers/uiHelper';
import Complemento from './Complemento';
export default class AdicionaProduto extends Component{

    constructor(props){
        super(props);

        const produto =this.props.navigation.getParam('produto', 'Não informado');
        
        this.state = {
            qtde: 1,
            id_produto: produto.id_produto,
            complemento:"",
            vlr_vendido: String(_formatMoney(produto.pvenda)),
            vlr_unidade: String(_formatMoney(produto.pvenda)),
            estoque: String(produto.saldo_geral),
            descricao: produto.produto_descricao,
            unidade: produto.unidade,
        }

        this.setStateComplemento = this.setStateComplemento.bind(this);
        this.getStateComplemento = this.getStateComplemento.bind(this);
        this.setStateValorVendido = this.setStateValorVendido.bind(this);

    }

    adicionaItemPedido(){

        if(this.state.qtde <= 0)
            return ToastAndroid.show('Quantidade Inválida', ToastAndroid.SHORT);

        this.setState({complemento: this.state.complemento.toUpperCase()}, ()=>{
            this.state.vlr_vendido = parseFloat(this.state.vlr_unidade);
            this.state.vlr_unidade = parseFloat(this.state.vlr_unidade);
            this.props.screenProps.addItemComanda(this.state);
            this.props.navigation.navigate("Pedidos");
        });

    

    }   

    setStateValorVendido(valor){
        let valorFinal = valor * this.state.qtde
        this.setState({vlr_vendido: valorFinal, vlr_unidade: parseFloat(valor)})
    }

    setStateComplemento(complemento){
        this.setState(() => {
            return({
                complemento: complemento
            })
        })
    }

    getStateComplemento(){
        return this.state.complemento;
    }

    handleCounter(qtde){
        this.setState( (prevState) =>{
            let valorFinal = parseFloat(prevState.vlr_unidade) * parseInt(qtde)
            return {qtde:qtde, vlr_vendido: valorFinal}   
        })
    }
    
    render(){
        const produto =this.props.navigation.getParam('produto', 'Não informado');
        return(
            
            <Container style={styles.container}>
                <ScrollView>
                    <View style={styles.headerAddItem}>
                        <View style={styles.headerAddItemContent}>
                            <Text style={ styles.headerAddItemProduct}>{this.state.descricao}</Text>
                            <Text style={[styles.text, styles.headerAddItemValue]}>R${ _formatMoney(this.state.vlr_vendido)}</Text>
                        </View>
                        <NumberPicker onChangeText={number => this.handleCounter(number)} unity={this.state.unidade}  />
                        <Complemento totalProdutos={this.state.qtde} setValorVendido = {this.setStateValorVendido} produto={produto}  setComplemento={this.setStateComplemento} getComplemento={this.getStateComplemento} />
                    </View>
                </ScrollView>
                <View style={[styles.buttonContainer]}>
                        <TouchableOpacity activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]} onPress={() => this.adicionaItemPedido()}>
                            <Text style={styles.buttonLightText}>
                            Adicionar Item
                            </Text>
                        </TouchableOpacity>
                 </View>
            </Container>
        )
    }
}