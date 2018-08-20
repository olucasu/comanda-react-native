import React, {Component} from  'react';
import {Text,View, TextInput, Button, ToastAndroid, TouchableOpacity} from 'react-native';
import {styles, Colors} from '../../components/Styles'
import {Container, Content} from 'native-base'
import {NumberPicker} from '../../components/Helpers/uiHelper';
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
        }


    

        this.adicionaItemPedido = this.adicionaItemPedido.bind(this);

    }

    adicionaItemPedido(){
        const spliStr = this.state.complemento.split(" ");

        let res ="";
        spliStr.map(str=>{
            if(typeof str != 'undefined') {
                console.log(str);
                res += str.toUpperCase() + "\r\n" ;
            }
         
        })
        
        this.setState({complemento: res})

        this.state.complemento = res; 

        this.props.screenProps.addItemComanda(this.state);

        ToastAndroid.show('Adicionado à lista para envio', ToastAndroid.SHORT);

        this.props.navigation.navigate("Pedidos");

    }   

    render(){
        
  

        return(
            <Container style={styles.container}>
                <View style={styles.headerAddItem}>
                    <View style={styles.headerAddItemContent}>
                        <Text style={[styles.text, styles.headerAddItemProduct]}>{this.state.descricao}</Text>
                        <Text style={[styles.text, styles.headerAddItemValue]}>R${this.state.vlr_vendido}</Text>
                    </View>
                    <NumberPicker onChangeText={text => this.setState({qtde:text})} unity={this.state.unidade}  />
                </View>
                <View style={styles.content}>
                    <TextInput underlineColorAndroid ={Colors.primary.lightColor} placeholder="Complemento" onChangeText={ text => this.setState({complemento:text})} value={this.state.complemento} />
                </View> 
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