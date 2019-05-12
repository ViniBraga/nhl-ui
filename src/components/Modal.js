import React, { Component } from 'react'

class Modal extends Component {
    render() {
        let modal = (
            <div className="modal">
                <button onClick={this.props.onClose}>x</button>
                <div>{this.props.children}</div>  
            </div>
        )
        return this.props.isOpen ? modal : null
    }
}
export default Modal