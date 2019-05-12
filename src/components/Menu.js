import React, { Component } from 'react'
import $ from 'jquery'
import Logo from '../images/nhl_logo.png'
import TeamMenu from './TeamMenu'
import PubSub from 'pubsub-js'

var logoStyle = {
    width: "50%",
    height: "193px",
    backgroundImage: `url(${Logo})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    marginLeft: "18%"
}

class Menu extends Component {

    constructor() {
        super()
        this.state = { teams: [], selectedTeamId: null }
    }

    componentDidMount() {
        $.ajax({
          url: 'https://statsapi.web.nhl.com/api/v1/teams',
          dataType: 'json',
          success: function (res) {
            this.setState({ teams: res.teams })
          }.bind(this)
        })
        PubSub.subscribe('teamSelected', (topic, teamId) => {
            if(this.state.selectedTeamId) {
                $("li#" + this.state.selectedTeamId).removeClass("menu-item-divided pure-menu-selected")
            }
            this.setState({ selectedTeamId:  teamId})
        })
    }

    render() {
        return (
            <div>
                <div id="menu">
                    <div className="pure-menu">
                        <a href="">
                            <div className="pure-menu-heading" style={logoStyle} />
                        </a>
                        <ul className="pure-menu-list">
                            {this.state.teams.map(team => {
                                return (<TeamMenu key={team.id} team={team}/>)
                            })}
                        </ul>

                    </div>
                </div>

            </div>
        
        )
    }
}
export default Menu