import React, {Component} from 'react';
import {View, TextInput, Text, Switch, FlatList} from 'react-native';
import {styles,Colors} from '../../components/Styles';
import Loader from '../../components/Helpers/loader';
import VistaAPI from '../../api/VistaAPI';


class Complemento extends Component{

    constructor(props){
        super(props);
        this.state = {
            produto:props.produto,
            isLoading:false,
            produtoComplemento:[],
            switchValue:false,
            tipoComplemento: "GERAL",
        };

        console.dir(props);
    }

    componentDidMount(){
        this.fetchData();
    }

    isNotLoading(){
        this.setState({isLoading:false});
    }

    async fetchData () {

        this.setState({
            isLoading: true
        })
    
        const api = new VistaAPI()
        
        let params = {};
        
        if(this.state.produto.pizza || this.state.produto.pizza > 0){
            this.setState({tipoComplemento: "PIZZA"})
            params = {
                apiMethod: 'GETProdutosPizza'
            }
        } else {
            params = {
                apiMethod: 'GETGruposComplementos',
                uri: this.state.produto.id_grupo,
                options: {
                    removedIdEmpresa: true
                }
            }
        }

        api.create(params)
        
        let response = await api.get()
    
        if (typeof response !== 'undefined' && response.ok) {
          let responseJson = await response.json()
          

          if(responseJson != null) {
            
            let itemIndex = 0;

            responseJson.map((complemento)=>{
                complemento.itemIndex = itemIndex;
                complemento.selecionado = false;
                itemIndex++
            });

            console.log(responseJson)
            return this.setState({produtoComplemento: responseJson}, this.isNotLoading)
          } else {
            return this.setState({isLoading:false})
          }
    
        } else {
            console.log(api);
            console.log(response);

          this.setState({
            isLoading: false,
            error: response.error
          })
        }
    }


    _listaComplemento(){

        let nameProp = "nome_complemento";

        let atualState =  Object.assign({}, this.state.produtoComplemento);

        if(this.state.tipoComplemento === "PIZZA") {
           nameProp = "produto_descricao" 
        }

        console.log("LISTA COMPLEMENTO");
        console.log(atualState);

        return(
            <FlatList
            data={this.state.produtoComplemento}
            renderItem={({ item }) => {
                console.log(item);
                return(
                    <View>
                        <Text>{item[nameProp]}</Text>
                        <Switch
                        onValueChange = {(value)=> {
                         
                            atualState[item.itemIndex].selecionado = value;
                            this.setState({produtoComplemento: atualState}) }
                        }
                        value = {item.selecionado}/>
                    </View>

                )}
            }
            keyExtractor={item => item.itemIndex.toString()}
          />
        )
    }

    _complementoSwitchSelector(){
        if(this.state.isLoading) return <Loader />
        return(
            this._listaComplemento()
        )
    }
    

    getInputPlaceholder(){
        return this.state.produtoComplemento.length > 0 ? "Outro complemento" : "Complemento";
    }

    render(){
        console.log("Render!")
        return(
            <View style={styles.content}>
                {this._complementoSwitchSelector()}
                <TextInput underlineColorAndroid ={Colors.primary.lightColor} placeholder={this.getInputPlaceholder()} onChangeText={ text => this.props.setComplemento(text)} value={this.props.getComplemento()} />
            </View> 
        );
    }

}

export default Complemento