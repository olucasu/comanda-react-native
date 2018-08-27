import React, {Component} from  'react';
import {Text,View, ToastAndroid, TouchableOpacity, ScrollView} from 'react-native';
import {styles, Colors} from '../../components/Styles'
import {Container, Content} from 'native-base'
import {NumberPicker, _formatMoney} from '../../components/Helpers/uiHelper';
import Complemento from './Complemento';
export default class AdicionaProduto extends Component{

    constructor(props){
        super(props);

        const produto =  props.navigation.getParam('produto', 'Não informado');

        this.state = {
            qtde: 1,
            id_produto: produto.id_produto,
            complemento:"",
            vlr_vendido: String(produto.pvenda),
            estoque: String(produto.saldo_geral),
            descricao: produto.produto_descricao,
            unidade: produto.unidade,
            produto: produto
        }

        this.setStateComplemento = this.setStateComplemento.bind(this);
        this.getStateComplemento = this.getStateComplemento.bind(this);
        this.setStateValorVendido = this.setStateValorVendido.bind(this);

    }

    adicionaItemPedido(){

        if(this.state.qtde <= 0)
            return ToastAndroid.show('Quantidade Inválida', ToastAndroid.SHORT);

        this.setState({complemento: this.state.complemento.toUpperCase()}, ()=>{
          
            this.props.screenProps.addItemComanda(this.state);
            this.props.navigation.navigate("Pedidos");
        
        });

      

    }   

    setStateValorVendido(valor){
        this.setState({vlr_vendido:valor})
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

    
    render(){
        return(
            
            <Container style={styles.container}>
                <ScrollView>
                    <View style={styles.headerAddItem}>
                        <View style={styles.headerAddItemContent}>
                            <Text style={ styles.headerAddItemProduct}>{this.state.descricao}</Text>
                            <Text style={[styles.text, styles.headerAddItemValue]}>R${ _formatMoney(this.state.vlr_vendido)}</Text>
                        </View>
                        <NumberPicker onChangeText={text => this.setState({qtde:text})} unity={this.state.unidade}  />
                        <Complemento setValorVendido = {this.setStateValorVendido} produto={this.state.produto}  setComplemento={this.setStateComplemento} getComplemento={this.getStateComplemento} />
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