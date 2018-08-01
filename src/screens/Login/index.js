import React, {Component } from 'react';
import {View} from 'react-native';
import {Icon, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';
import VistaAPI from '../../api/VistaAPI'


class Login extends Component {

    state = {
        loginSuccess : true,
        User : '',
        Password : ''
    }

    render(){
        VistaAPI.create({
            uri: '/GetMesas/2',
            method: 'GET'
        });

        const response = VistaAPI.response();
        

        console.log(response);

        return( 
            <View>
                <FormLabel>Usuário</FormLabel>
                <FormInput placeholder="Usuário" />
                <FormLabel>Senha</FormLabel>
                <FormInput placeholder="Senha" secureTextEntry={true}/>
                <FormValidationMessage>{ this.state.loginSuccess ? '' : 'Usuário ou senha incorretos' }</FormValidationMessage>
                <Button onPress={ () => { alert('Voce fez o login!')}}  title="Entrar" />
            </View>
            
        )
    }
}

export default Login;
