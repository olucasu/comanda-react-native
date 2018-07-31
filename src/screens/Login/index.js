import React, {Component } from 'react';
import {View} from 'react-native';
import {Icon, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

class Login extends Component {

    state = {
        loginSuccess : true,
        User : '',
        Password : ''
    }

    render(){
       function getMesas() {

     
          
    }
     

        return( 
            <View>
                <FormLabel>Usuário</FormLabel>
                <FormInput placeholder="Usuário" />
                <FormLabel>Senha</FormLabel>
                <FormInput placeholder="Senha" secureTextEntry={true}/>
                <FormValidationMessage>{ this.state.loginSuccess ? '' : 'Usuário ou senha incorretos' }</FormValidationMessage>
                <Button onPress={ () => { getMesas() }}  title="Entrar" />
            </View>
            
        )
    }
}

export default Login;
