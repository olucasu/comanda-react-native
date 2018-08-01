

// Params   Id empresa, Id server, 

/**
 * Get mesas : /GetMesas/2  (2) Id Empresa
 */
import base64 from '../components/util/base64';


class VistaAPI {

    state = {
        baseUrl : 'http://192.168.1.55:5001/datasnap/rest/TServerFOOD',
        username: 'vistatec',
        password: 'KalisbaTec08809',
        method: '',
        uri:''
    }

    /**
        * Create request
        * Recebe objeto
        * uri - treicho da url que representa o métodos
        * method - "POST", "GET"
    */
    create(obj){
        this.state.method = obj.method
        this.state.uri = obj.uri
    }

    async response(){

        const url = this.state.baseUrl+this.state.uri;
        const credentials = this.state.username +':'+ this.state.password;
        const method = this.state.method;
        
        try{
            let response = await fetch(url, { 
                method: method,
                headers: new Headers({
                  'Authorization': 'Basic '+base64.encode(credentials)
                })
              })
    
            let responseJson = await response.json();
            
            return responseJson;
           
        } catch(error) {
            console.log(error)
        }

     


    }


    
          
}





export default new VistaAPI();