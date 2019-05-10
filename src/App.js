import React, { Component } from 'react'
import Main from './components/Main'
import Menu from './components/Menu'
import './css/pure-min.css'
import './css/side-menu.css'

class App extends Component {

  render() {
    return (
      <div id="layout">
        <Menu/>
        <Main/>
      </div>
    )
  }
}
export default App
