import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import $ from 'jquery'

class TeamMenu extends Component {

    constructor() {
        super();
        this.selectTeam = this.selectTeam.bind(this)
    }

    selectTeam(event) {
        PubSub.publish('teamSelected', event.currentTarget.id)
        $(event.currentTarget).addClass("pure-menu-item pure-menu-selected")
    }
    
    render() {
        return(
            <li id={ this.props.team.id } onClick={ this.selectTeam } className="pure-menu-item">
                <a href="#" className="pure-menu-link">
                    <div className="wrapper-team">
                        <div className="wrapper-team-logo">
                            <img className="team-logo" src={require(`../images/logo_${this.props.team.id}.png`)}/>
                        </div>
                        <div className="wrapper-team-name">
                            { this.props.team.name }
                        </div>
                    </div>

                </a>
            </li>
        )
    }

}
export default TeamMenu