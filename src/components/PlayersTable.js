import React from 'react'

export default ({ playersList, filterPosition, onSort, showNationality }) => {
    
    const filteredPlayers = playersList
        .filter(player => {
            return player.position.name.toUpperCase().indexOf(filterPosition.toUpperCase()) >= 0
        })
        .map(player => {
            return (
                <tr id={player.person.id} key={player.person.id} onClick={(e) => showNationality(e)} >
                    <td style={{fontWeight:'bold'}}>{player.jerseyNumber}</td>
                    <td>{player.person.fullName}</td>
                    <td>{player.position.name}</td>
                </tr>
            )
        })

    return(
        <div className="scrollable-table">
            <table className="pure-table">
                <thead><tr>
                    <td onClick={() => onSort('jersey')} style={{cursor: "pointer"}}>
                        JERSEY <img src={require(`../images/sort_ico.png`)}/>
                    </td>
                    <td onClick={() => onSort('name')} style={{cursor: "pointer"}}>
                        NAME <img src={require(`../images/sort_ico.png`)}/>
                    </td>
                    <td>POSITION</td>
                </tr></thead>
                <tbody>{filteredPlayers}</tbody>
            </table>
        </div>

    )

}