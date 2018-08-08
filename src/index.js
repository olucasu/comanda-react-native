import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import {AppNav} from './router';
import Login from './router/login'
import Loader from './components/Helpers/loader'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state =  {
      isLoggedIn: false,
      HasConfiguration: false,
      usuario: [],
      isLoaded: false
    }
    this.handleLogin = this.handleLogin.bind(this)

  }

  componentWillMount () {
    this._retrieveData()
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'Logado')
      console.dir('store!')
    } catch (error) {
      console.dir(error)
    }
  }

  _retrieveData = async () => {
   
    console.log('Retrive data')
    try {
      const value = await AsyncStorage.getItem('isLoggedIn')
      console.dir(value)
      if (value !== null) {
        this.setState({ isLoaded: true })
        this.setState({ isLoggedIn: true })
      console.dir(this.state);
        
        return value
      } else {
        this.setState({ isLoaded: true })
      }
    } catch (error) {
      console.dir(error)
    }
  }

  handleLogin (responseJson) {
    this.state.isLoggedIn = true
    this._storeData(true)
    return this.forceUpdate()
  }

  render () {
    if (this.state.isLoaded) {
      if (this.state.isLoggedIn) return <AppNav />
      else {
        return <Login parentState={this.handleLogin} />
      }
    } else {
      return <Loader />
    }
  }
}
