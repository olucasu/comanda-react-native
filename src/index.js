import React, {Component} from 'react';

import AppNav from './router';
import Login from './screens/Login';

export default class App extends Component {  
  
    state = {
      isLoggedIn : true,
      HasConfiguration: false
    }
  
  render(){
      if(this.state.isLoggedIn) {
          return(
            <AppNav/>
          )
      } else {
          return(
            <Login />
          )
      }
    }
}


