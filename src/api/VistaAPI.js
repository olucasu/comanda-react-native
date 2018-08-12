//Rotas da API

// LISTAR MESAS
// http:urlServer/datasnap/rest/TServerFOOD/GETMesas/IdEmpresa/(STRING)Status

// LISTAR GRUPOS
// http:urlServer/datasnap/rest/TServerFOOD/GETGrupos/idEmpresa

// LISTAR PRODUTOS
// http:urlServer/datasnap/rest/TServerFOOD/GETProdutos/IdEmpresa/IdGrupo/IdProduto/(STRING)DescricaoProduto

//Login Usuário
// http:urlServer/datasnap/rest/TServerFOOD/GETUsuario/login/senha

import {AsyncStorage} from 'react-native';
import base64 from '../components/Util/base64';
import { isUrl } from '../components/Util/validations';

class VistaAPI {

  constructor(){
    console.log('VistaAPI está trabalhando...');
  }

  /*
    *Estado Inicial do Componente
  */
  state = {
    baseUrl:'',
    username: 'vistatec',
    password: 'KalisbaTec08809',
    method: '',
    uri: '',
    response: '',
    isFetching: true,
    endPoint: ''
  }


  /*
    *Recupera URL do servidor das configurações internas do App
  */
  async setUrlServerAsync(){
    const urlServer = await AsyncStorage.getItem('urlServer');
    this.state.baseUrl = urlServer;
    return urlServer;
  }

/*
  * Responsável por controlar o tempo de resposta do servidor;
  * Retorna uma promise race.
*/
  startFetch (ms, promise) {


    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id)
        reject({
          error: 'Não há conexão com o servidor ou demorou muito para responder',
          ok: false
        })
      }, ms)
    })

    try {
      return Promise.race([promise, timeout])
    } catch (e) {
      return e
    }
  }

  /*
    * Create request
    * Recebe objeto
    * uri - treicho da url que representa o métodos
    * method - "POST", "GET"
  */
  create (obj) {
    this.state.method = obj.method
    this.state.uri = obj.uri
  }

  async post() {

    const json = 
    [
      {
        "id_venda": 1,
        "item":1,
        "id_produto":1,
        "qtde":3.4,
        "id_empresa":2
      },
      {
        "id_venda": 2,
        "item":3,
        "id_produto":3,
        "qtde":3.4,
        "id_empresa":2
      },
      
    ]

    const credentials = this.state.username + ':' + this.state.password
    const method = this.state.method
    const that = this;

    let params = {
      method: method,
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      }),
      body: JSON.stringify(json)
    }

    try {
      let promiseTimeout = await this.startFetch(5000, fetch(that.state.endPoint, params))
      return promiseTimeout
    } catch (e) {
      return {
        ok: false,
        error: typeof e.message !== 'undefined' ? e.message : e.error
      }
    }


  }

  /*
    * Response
    * Retorna uma 'promise' baseada nas configurações feitas no método create
  */

  async response () {
    
    await this.setUrlServerAsync();

    const url = this.state.baseUrl + this.state.uri 
    const credentials = this.state.username + ':' + this.state.password
    const method = this.state.method
    this.state.endPoint = url;
    const that = this;
    let params = {
      method: method,
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      })
    }
    
    if( ! isUrl(this.state.endPoint)) {
      console.log("Url inválida.");

      return {
        ok: false,
        error: 'Url Inválida'
      }
    }

    try {
      let promiseTimeout = await this.startFetch(30000, fetch(that.state.endPoint, params))
      console.log(promiseTimeout);
      return promiseTimeout
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: typeof e.message !== 'undefined' ? e.message : e.error
      }
    }
  }

  async getCustomEndPoint () {

    let params = {
      method: 'GET',
    }
    
    await this.setUrlServerAsync();

    const endPoint =  await this.state.baseUrl+this.state.uri;


    if( ! isUrl(endPoint)) {
      console.log("Url inválida.");

      return {
        ok: false,
        error: 'Url Inválida'
      }
    }
      

    try {       
      let promiseTimeout = await this.startFetch(60000, fetch(endPoint, params))
      return promiseTimeout
    } catch (e) {
      return {
        ok: false,
        error: typeof e.message !== 'undefined' ? e.message : e.error
      }
    }
  }

  setCustomEndPoint (url) {
    this.state.endPoint = url
  }

}

export default VistaAPI;




