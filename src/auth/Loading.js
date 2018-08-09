import React , {Component} from 'react';
import{
    AsyncStorage,
    View
} from 'react-native'
import Loader from '../components/Helpers/loader';

class Loading extends Component {
    
    constructor(props){
        super(props);
        this._startLoginAsync();
    }
    
    _startLoginAsync = async () => {

        console.log('carregando...');

        try{
            //Recupera autorização de usuário
            const userToken = await AsyncStorage.getItem('userToken');
            
            //Recupera a string JSON de usuário
            const usuario = await AsyncStorage.getItem('usuario');

            //Recupera a string JSON de usuário
            const urlServer = await AsyncStorage.getItem('urlServer');


            this.props.navigation.navigate(userToken? 'AppNav' : 'Auth')

            console.log(userToken);
            console.log(urlServer);
            console.log(JSON.parse(usuario))

          
        } catch(error) {
            console.dir(error);
        }
     
    }

    render(){
        return(
            <Loader />
        )
    }
}


export default Loading;
