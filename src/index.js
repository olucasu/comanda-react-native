import React, { Component } from 'react'

import {AppNav, Auth} from './router'

export default class App extends Component {
  state = {
    isLoggedIn: false,
    HasConfiguration: false
  }


  callBack(){
    return this
  }  

  render () {

    console.dir(AppNav);
    if (this.state.isLoggedIn) {
      return <AppNav />
    } else {
      return <Auth parentState={this.callBack} />
    
    }
  }
}
