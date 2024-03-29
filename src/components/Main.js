import React, { Component } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export default () => {
    return (
        <div className="main">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    )
}