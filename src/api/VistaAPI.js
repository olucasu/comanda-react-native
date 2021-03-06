// Rotas da API

// LISTAR MESAS
// http:urlServer/datasnap/rest/TServerFOOD/GETMesas/IdEmpresa/(STRING)Status

// LISTAR GRUPOS
// http:urlServer/datasnap/rest/TServerFOOD/GETGrupos/idEmpresa

// Lista Complemento de Grupos
// http:urlServer/datasnap/rest/TServerFOOD/GETGruposComplementos/idGrupo

// LISTAR PRODUTOS
// http:urlServer/datasnap/rest/TServerFOOD/GETProdutos/IdEmpresa/IdGrupo/IdProduto/(STRING)DescricaoProduto

// Login Usuário
// http:urlServer/datasnap/rest/TServerFOOD/GETUsuario/login/senha

// LANÇAR ÍTENS
// MÉTODO: [POST]
// http:urlServer/datasnap/rest/TServerFOOD/ItemVenda

// Caso específico de PIZZA
// Recupera complementos de pizza
// Popular Complemento;
// http:urlServer/datasnap/rest/TServerFOOD/GETProdutosPizza/idEmpresa


import { AsyncStorage } from 'react-native'
import base64 from '../components/Util/base64'
import { isUrl } from '../components/Util/validations'

class VistaAPI {

   /*
    *Estado Inicial do Componente
  */
  state = {
    baseUrl: '',
    username: 'vistatec',
    password: 'KalisbaTec08809',
    apiMethod: '',
    uri: '',
    isFetching: true,
    usuario: '',
    body: '', 
    removedIdEmpresa: false,
    defaultMsg: "Ocorreu um erro no servidor o IP está correto? Verifique se há necessidade de informar a porta.\n Exemplo: 192.168.0.1:8080.",
  }

  /*
    *Recupera URL do servidor das configurações internas do App
  */
  async setUrlServerAsync () {
    const urlServer = await AsyncStorage.getItem('urlServer')
    
    this.state.baseUrl =  `http://${urlServer}/datasnap/rest/TServerFOOD/`;

    return urlServer
  }

  async setUsuarioAsync () {
    const usuario = await AsyncStorage.getItem('usuario');
    this.state.usuario =  JSON.parse(usuario);
    return usuario;
  }

  /*
  * Responsável por controlar o tempo de resposta do servidor;
  * Retorna uma promise race.
*/
 async startFetch (ms, promise) {

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

  /** 
    * Create request
    * Recebe objeto
    * 
    * PARAMS -----
    * 
    * uri - treicho da url que representa o métodos - OPCIONAL
    * 
    * apiMethod - Método da API a ser utilizado - OBRIGATÓRIO
    * 
    * options - Objeto -
    *  
    * removedIdEmpresa : boolean - Define se ná uri constará ou não o id da empresa
  */
  create (obj) {
    this.state.uri = obj.uri ? obj.uri : "";
    this.state.apiMethod = obj.apiMethod;
    
    if(obj.options) {
      if(obj.options.removedIdEmpresa) this.state.removedIdEmpresa = obj.options.removedIdEmpresa
    }
    if( obj.body != null) this.state.body = obj.body;
  }

  async post () {
   
    await this.setUrlServerAsync();

    const baseUrl = await this.state.baseUrl;

    const endPoint = baseUrl+ this.state.apiMethod;
    
    if (!isUrl(endPoint)) {
      return {
        ok: false,
        error: 'Url Inválida'
      }
    }
    
    const credentials = this.state.username + ':' + this.state.password

    let params = {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      }),
      body: this.state.body
    }



    try {
      let promiseTimeout = await this.startFetch(30000,fetch(endPoint, params)
      )
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

  async get () {

    await this.setUrlServerAsync();
    await this.setUsuarioAsync();

    const baseUrl = await this.state.baseUrl;
    let idEmpresa = await this.state.usuario.id_empresa;

    idEmpresa = this.state.removedIdEmpresa ? idEmpresa = "": `${idEmpresa}/`;

    endPoint = `${baseUrl + this.state.apiMethod}/${idEmpresa}${this.state.uri}`;

    const credentials = this.state.username + ':' + this.state.password

    let params = {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      })
    }

    if (!isUrl(endPoint)) {
      return {
        ok: false,
        error: 'Url Inválida'
      }
    }

    try {
      let promiseTimeout = await this.startFetch(30000, fetch(endPoint, params))

      if( ! promiseTimeout.ok) {

        return {
          ok: false,
          error:  promiseTimeout.status == 500 ? this.state.defaultMsg : `Ocorreu um erro inesperado, erro: ${promiseTimeout.status}`
        }
      }

      return promiseTimeout
    } catch (e) {
      return {
        ok: false,
        error: typeof e.message !== 'undefined' ? e.message : e.error
      }
    }
  }

  async getUsuario() {
    await this.setUrlServerAsync();
    const credentials = this.state.username + ':' + this.state.password
    const baseUrl = await this.state.baseUrl;
    let endPoint = baseUrl + this.state.apiMethod  +'/' + this.state.uri

    let params = {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      })
    }

    if (!isUrl(endPoint)) {
      return {
        ok: false,
        error: 'Url Inválida'
      }
    }

    try {

      let promiseTimeout = await this.startFetch(30000, fetch(endPoint, params))


      if( ! promiseTimeout.ok) {

        let responseJson = null;
        if( promiseTimeout.status != 404) {
          responseJson = await promiseTimeout.json();
        }

        return {
          ok: false,
          error:  responseJson && responseJson.error  ? responseJson.error : `Ocorreu um erro inesperado, erro: ${promiseTimeout.status}`
        }
      }

      return promiseTimeout;

    } catch (e) {
      return {
        ok: false,
        error: typeof e !== 'undefined' ? e.message : "Ocorreu um erro inesperado"
      }
    }
  }

  async getCustomEndPoint () {
    let params = {
      method: 'GET'
    }

    await this.setUrlServerAsync()

    const endPoint = (await this.state.baseUrl) + this.state.uri

    if (!isUrl(endPoint)) {

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

export default VistaAPI
