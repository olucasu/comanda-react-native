import React, {Component} from  'react';
import {Text,View, TextInput, Button, ToastAndroid} from 'react-native';
import {styles} from '../../components/Styles'
import {Container} from 'native-base'
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


    
        console.log(produto);

        this.adicionaItemPedido = this.adicionaItemPedido.bind(this);

    }

    adicionaItemPedido(){
        const spliStr = this.state.complemento.split(" ");

        let res ="";
        spliStr.map(str=>{
            if(typeof str != 'undefined') {
                console.log(str);
                res += str + "/\n" ;
            }
         
        })

        console.log(spliStr);
        console.log(res)

        
        this.setState({complemento: res.toUpperCase()})

        this.state.complemento = res; 

        console.dir(this.state.complemento);

        this.props.screenProps.addItemComanda(this.state);

        ToastAndroid.show('Adicionado à lista para envio', ToastAndroid.SHORT);
        this.props.navigation.navigate("Pedidos");

    }   

    render(){
        
  

        return(
            <Container style={styles.container}>
                <View>
                    <Text>{this.state.desricao}</Text>
                </View>
                <View>
                    <Text>Preço:R${this.state.pvenda}</Text>
                    <Text>Em estoque:{this.state.estoque}</Text>
                    <Text>Código: {this.state.id}</Text>
                </View>
                <NumberPicker onChangeText={text => this.setState({qtde:text})} unity={this.state.unidade}  />
                <View>
                    <Text>Complemento</Text>
                    <TextInput placeholder="Complemento" onChangeText={ text => this.setState({complemento:text})} value={this.state.complemento} />
                </View> 
                <Button onPress={() => this.adicionaItemPedido()} title="Adicionar item"/>          
            </Container>
        )
    }
}