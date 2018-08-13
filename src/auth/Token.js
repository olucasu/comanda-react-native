import{AsyncStorage} from 'react-native';
class Token {
    async getUsuarioAsync(){
        const usuario = await AsyncStorage.getItem('usuario');
        return usuario;
    }
}
export default Token;