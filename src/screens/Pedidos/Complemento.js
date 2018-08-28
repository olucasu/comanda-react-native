import React, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {styles,Colors} from '../../components/Styles';
import Loader from '../../components/Helpers/loader';
import VistaAPI from '../../api/VistaAPI';
import {CheckBox} from 'native-base';
import {_formatMoney} from '../../components/Helpers/uiHelper';
 

class Complemento extends Component{

    constructor(props){
        super(props);
        this.state = {
            produto:props.produto,
            isLoading:false,
            defaultComplemento: "",
            produtoComplemento:[],
            switchValue:false,
            tipoComplemento: "GERAL",
            strComplemento: "",
        };
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
            return this.setState({produtoComplemento: responseJson}, this.isNotLoading)
          } else {
            return this.setState({isLoading:false})
          }
    
        } else {
          this.setState({
            isLoading: false,
            error: response.error
          })
        }
    }

    isPizza(){
        return this.state.tipoComplemento === "PIZZA";
    }

    _listaComplemento(){

        let nameProp = "nome_complemento";
        let contentType = "Complementos";
        let valueProp = "valor";

        let atualState =  Object.assign({}, this.state);

        if(this.isPizza()) {
           nameProp = "produto_descricao";
           contentType = "Adicionar sabores";
           valueProp = "pvenda"; 
        }

    

        const handlePress =  (item) => {

            let checked = atualState.produtoComplemento[item.itemIndex].selecionado;

            atualState.produtoComplemento[item.itemIndex].selecionado = !checked;

            this.setState({produtoComplemento: atualState.produtoComplemento}) 

            const {setComplemento, setValorVendido, produto} = this.props;

            var str ="";

            let valorAtual = produto.pvenda;
            let valorComplementos = 0;

            this.setState({strComplemento: ""});
           
           
            atualState.produtoComplemento.map((complemento)=>{
                if(complemento.selecionado) {
                    str+= `${complemento[nameProp]} - R$${ _formatMoney(complemento[valueProp])}\n`;
                    this.setState({strComplemento: str}, () =>{
                        setComplemento(str);
                    });

                    if(this.isPizza()) {
                        valorAtual = complemento.pvenda >= valorAtual ? complemento.pvenda : valorAtual;
                    } else {
                        valorComplementos += complemento.valor
                    }
                } 
            })

            if( atualState.defaultComplemento != "")  str += `${atualState.defaultComplemento}\n`;

            if(this.isPizza()) setValorVendido( valorAtual);
            if( ! this.isPizza())  {
                valorAtual  += valorComplementos ;
                setValorVendido( valorAtual);   
            }

        }

        const getTitle = () =>{
            if(this.state.produtoComplemento.length > 0){
                return(
                    <Text style={styles.contentTitle}> 
                        {contentType}
                    </Text>
                )
            }
        }

        return(
            <View>
               {getTitle()}
                <FlatList
                        data={this.state.produtoComplemento}
                        extraData={this.state}
                        renderItem={({ item }) => {
                            return(
                                <TouchableOpacity 
                                    style={[styles.listItem, styles.sideBySide, {paddingRight: 20}]}
                                    onPress={ () => handlePress(item)}
                                     activeOpacity={0.9}>
                                    <Text style={styles.text}>{item[nameProp]} - R${_formatMoney(item[valueProp])}</Text>
                                    <CheckBox
                                    onPress={ () => handlePress(item)}
                                    checked={item.selecionado} color={Colors.primary.lightColor}/>
                                </TouchableOpacity>
                            )}
                        }

                        keyExtractor={item => item.itemIndex.toString()}
                    />
            </View>
       
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

    handleDefaultComplemento(text){
        
        const {setComplemento} = this.props;
        this.setState({defaultComplemento: text},()=>{
            let str = this.state.strComplemento;
            str+= `${this.state.defaultComplemento}\n`;
            setComplemento(str);
        })
    
    }

    render(){
    
        return(
            <View style={styles.content}>
                {this._complementoSwitchSelector()}
                <TextInput multiline={true}  style={[styles.text, styles.listItem]} underlineColorAndroid ={Colors.primary.lightColor} placeholder={this.getInputPlaceholder()} onChangeText={ text => this.handleDefaultComplemento(text) } value={this.state.defaultComplemento} />
            </View> 
        );
    }

}

export default Complemento