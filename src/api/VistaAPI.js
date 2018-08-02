

// Params   Id empresa, Id server, 

/**
 * Get mesas : /GetMesas/2  (2) Id Empresa
 */

import base64 from '../components/util/base64';


class VistaAPI {

    state = {
        baseUrl : 'http://192.168.1.5:5001/datasnap/rest/TServerFOOD',
        username: 'vistatec',
        password: 'KalisbaTec08809',
        method: '',
        uri:'',
        response: '',
        isFetching : true,
        endPoint: ''
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

    setCustomEndPoint(url){
        this.state.endPoint = url
    }

    async get(){

        const url = this.state.endPoint;

        try{
            let params = { 
                method: 'GET'
            };

            let response = await fetch(url, params);

            let responseJson = await response.json();
    
            return responseJson;

       
        } catch(error) {
            console.log(error)
        }   
    }


    async response(){

        const that = this;
        const url = this.state.baseUrl+this.state.uri;
        const credentials = this.state.username +':'+ this.state.password;
        const method = this.state.method;

        try{

            let that = this;

            let params = { 
                method: method,
                headers: new Headers({
                  'Authorization': 'Basic '+base64.encode(credentials)
                })
            };

            let response = await fetch(url, params);

            let responseJson = await response.json();
     
            return responseJson;

           
        } catch(error) {
            console.log(error)
        }
    }
}






export default new VistaAPI();