import React, { Component } from 'react'
import PlayersTable from './PlayersTable'
import Modal from './Modal'
import $ from 'jquery'
import PubSub from 'pubsub-js'

class PlayersPage extends Component {

    constructor() {
        super()
        this.state = { 
            filterText: "", 
            isModalVisible: false,
            nationalityCode: "",
            nationality: ""
        }
        this.filterUpdate = this.filterUpdate.bind(this)
        this.fetchNationality =this.fetchNationality.bind(this)
        this.fetchCountry =this.fetchCountry.bind(this)
    }

    componentDidMount() {
        this.setState({ players: this.props.players})
        PubSub.subscribe('resetTeam', () => {
            this.setState({isModalVisible: false, filterText: ""})
        })
    }

    filterUpdate(event) {
        event.preventDefault()
        this.setState({ filterText: event.currentTarget.value })
    }

    fetchPlayerNationality = (playerSelectedId) => new Promise((resolve, reject) => {
        $.ajax({
            url: "https://statsapi.web.nhl.com/api/v1/people/" + playerSelectedId,
            dataType: 'json',
            success: function(res) {
                this.setState({ 
                    playerSelected: res.people[0],
                    nationalityCode: res.people[0].nationality.toLowerCase(),
                })
                resolve()
            }.bind(this)
        })  
    })

    fetchCountry = (nationality) => new Promise((resolve, reject) => {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/alpha/" + nationality,
            dataType: 'json',
            success: function (res) {
                this.setState({
                    nationality: res.name
                })
                resolve()
            }.bind(this)
        })
    })

    fetchNationality = async(playerSelectedId) => {
        if(!this.state.isModalVisible) {
            await this.fetchPlayerNationality(playerSelectedId)
            await this.fetchCountry(this.state.nationalityCode)
            this.setState({
                isModalVisible: true,
            })
        }
    }

    openModal(e){
        this.fetchNationality(e.currentTarget.id)
    }

    render() {      
        return (
            <div className="content">

                <div className="filter-position">
                    <input type="text" placeholder="Position..." onChange={this.filterUpdate}/>
                </div>
                
                <PlayersTable playersList={this.props.players} 
                        filterPosition={this.state.filterText} 
                        onSort={this.props.onSort}
                        showNationality={e => this.openModal(e)}/>

                <Modal isOpen={this.state.isModalVisible} onClose={(e) => this.setState({isModalVisible: false})}>
                    <div className="country-name">{this.state.nationality}</div>
                    <div className="container-flag">
                        <br/>
                        <img src={"https://restcountries.eu/data/" + this.state.nationalityCode + ".svg"}></img>
                    </div>

                </Modal>
            
            </div> 
        )
    }

}
export default PlayersPage