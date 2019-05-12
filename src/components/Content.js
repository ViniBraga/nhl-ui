import React, { Component } from 'react'
import InitialPage from './InitialPage'
import PlayersPage from './PlayersPage'
import $ from 'jquery'
import PubSub from 'pubsub-js'

class Content extends Component {

    constructor() {
        super()
        this.state = { 
            players: [],
            ascOrderJersey: true,
            ascOrderName: true
        }
        this.sortBy = this.sortBy.bind(this)
    }

    componentDidMount() {
        PubSub.subscribe('teamSelected', (topic, teamId) => {
            this.fetchPlayers(teamId)
            PubSub.publish('resetTeam')
        })
    }

    fetchPlayers(teamId) {
        $.ajax({
            url: "https://statsapi.web.nhl.com/api/v1/teams/" + teamId + "/roster",
            dataType: 'json',
            success: function (res) {
              this.setState({ players: res.roster })
            }.bind(this)
        })
    }

    sortBy(field) {
        if(field === 'jersey') {
            if(this.state.ascOrderJersey) {
                this.sortIncreasingByJersey()
            } else {
                this.sortDecreasingByJersey()
            }
        } else {
            if(this.state.ascOrderName) {
                this.sortIncreasingByName()
            } else {
                this.sortDecreasingByName()
            }
        }
    }

    sortIncreasingByName() {
        let copyPlayers = this.state.players
        copyPlayers.sort(function (a, b) {
            return (a.person.fullName > b.person.fullName) ? 1 : ((b.person.fullName > a.person.fullName) ? -1 : 0);
        });
        this.setState({ players: copyPlayers, ascOrderName: false  })
    }

    sortDecreasingByName() {
        let copyPlayers = this.state.players
        copyPlayers.sort((a, b) => {
            return (a.person.fullName < b.person.fullName) ? 1 : ((b.person.fullName < a.person.fullName) ? -1 : 0);
        });
        this.setState({ players: copyPlayers, ascOrderName: true  })
    }

    sortIncreasingByJersey() {
        let copyPlayers = this.state.players
        copyPlayers.sort((a, b) => {
            let intA = parseInt(a.jerseyNumber)
            let intB = parseInt(b.jerseyNumber)
            return (intA > intB) ? 1 : ((intB > intA) ? -1 : 0);
        })        
        this.setState({ players: copyPlayers, ascOrderJersey: false  })
    }

    sortDecreasingByJersey() {
        let copyPlayers = this.state.players
        copyPlayers.sort((a, b) => {
            let intA = parseInt(a.jerseyNumber)
            let intB = parseInt(b.jerseyNumber)
            return (intA < intB) ? 1 : ((intB < intA) ? -1 : 0);
        })        
        this.setState({ players: copyPlayers, ascOrderJersey: true  })
    }

    render() {
        return this.state.players.length !== 0 ? (<PlayersPage players={this.state.players} onSort={this.sortBy} />) : (<InitialPage/> )
    }

}
export default Content