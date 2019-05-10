import React, { Component } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        )
    }
}
export default Main