import React, { Component} from 'react';
import {View, Text} from 'react-native';
import {FormLabel, FormInput} from 'react-native-elements';

export default class Configuracoes extends Component {
    


    getUrlServer = () => {

    };


    state = {
        urlServer : this.getUrlServer()
    }
    
    render(){
        return(
            <View>
                <FormLabel>Informe a URL do servidor</FormLabel>
                <FormInput onChangeText={text => this.setState({inputValue: text})} onSubmitEditing={ () => this.searchTables() }  />
            </View>
        )
    }
}