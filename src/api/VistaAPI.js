// Params   Id empresa, Id server,

/**
 * Get mesas : /GetMesas/2  (2) Id Empresa
 * Get mesas por status : /GetMesas/2/(STATUS)  LIVRE - OCUPADA(O) - CONTA - RESERVADA(O)
 */

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

  async response () {
    const url = this.state.baseUrl + this.state.uri
    const credentials = this.state.username + ':' + this.state.password
    const method = this.state.method
    this.state.endPoint = url;
    
    let params = {
      method: method,
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(credentials)
      })
    }

    try {
      let promiseTimeout = await this.startFetch(40000, fetch(url, params))
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

  async get () {
    const url = this.state.endPoint

    try {
      let params = {
        method: 'GET',
        timeout: 0
      }

      let response = await fetch(url, params)

      let responseJson = await response.json()

      return responseJson
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default new VistaAPI()
