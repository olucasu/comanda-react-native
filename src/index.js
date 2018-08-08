import React, { Component } from 'react'

import AppNav from './router'
import Login  from './router/login'
export default class App extends Component {
  state = {
    isLoggedIn: false,
    HasConfiguration: false
  }


  callBack(){
    return this
  }  

  render () {

      return <AppNav />
    
  }
}
