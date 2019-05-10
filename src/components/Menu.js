import React, { Component } from 'react'
import $ from 'jquery'

class Menu extends Component {

    constructor() {
        super()
        this.state = { teams: [] }
    }

    componentDidMount() {
        $.ajax({
          url: "https://statsapi.web.nhl.com/api/v1/teams",
          dataType: 'json',
          success: function (res) {
            this.setState({ teams: res })
          }.bind(this)
        })
    }
    

    render() {
        return (
            <div>

                {/* <a href="#menu" id="menuLink" className="menu-link">
                    <span>TESTE MENU</span>
                </a>  */}

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">About</a></li>

                            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                                <a href="#" className="pure-menu-link">Services</a>
                            </li>

                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Contact</a></li>
{/* 
                            {
                                this.state.teams.map((team) => {
                                    return (<li key={team.id} className="pure-menu-item"><a href="#" className="pure-menu-link">{team.name}</a></li>)
                                })
                            } */}

                        </ul>
                    </div>
                </div>

            </div>
        
        )
    }
}
export default Menu