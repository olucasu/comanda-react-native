import React , {Component} from 'react';
import{
    AsyncStorage
} from 'react-native';
import Loader from '../components/Helpers/loader';

class Loading extends Component {
    
    constructor(props){
        super(props);
        console.log('Loading...')

        this._startLoginAsync();
    }
    

    componentDidMount(){
        this.forceUpdate();
    }

    _startLoginAsync = async () => {

        try{
            //Recupera autorização de usuário
            const userToken = await AsyncStorage.getItem('userToken');
            
            //Recupera a string JSON de usuário
            const usuario = await AsyncStorage.getItem('usuario');

            //Recupera URL do server
            const urlServer = await AsyncStorage.getItem('urlServer');
            
            this.props.navigation.navigate(userToken? 'AppNav' : 'Auth')


          
        } catch(error) {
            console.error(error);
        }
     
    }

    render(){
        return(
            <Loader />
        )
    }
}


export default Loading;
