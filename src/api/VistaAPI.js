//Rotas da API

// LISTAR MESAS
// http:urlServer/datasnap/rest/TServerFOOD/GETMesas/IdEmpresa/(STRING)Status

// LISTAR GRUPOS
// http:urlServer/datasnap/rest/TServerFOOD/GETGrupos/idEmpresa

// LISTAR PRODUTOS
// http:urlServer/datasnap/rest/TServerFOOD/GETProdutos/IdEmpresa/IdGrupo/IdProduto/(STRING)DescricaoProduto

import base64 from '../components/util/base64'

class VistaAPI {
  state = {
    baseUrl: 'http://192.168.1.5:5001/datasnap/rest/TServerFOOD/',
    username: 'vistatec',
    password: 'KalisbaTec08809',
    method: '',
    uri: '',
    response: '',
    isFetching: true,
    endPoint: ''
  }

  // Responsável por controlar o tempo de resposta do servidor;
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

  /**
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
      let promiseTimeout = await this.startFetch(10000, fetch(that.state.endPoint, params))

      return promiseTimeout
    } catch (e) {
      return {
        ok: false,
        error: typeof e.message !== 'undefined' ? e.message : e.error
      }
    }


  }


  /**
        * Response
        * Retorna uma 'promise' baseada nas configurações feitas no método create
  */

  async response () {
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

    try {
      let promiseTimeout = await this.startFetch(20000, fetch(that.state.endPoint, params))
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

export default new VistaAPI()




