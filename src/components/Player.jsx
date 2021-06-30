import React from 'react'

const Player = () => {
    return (
    <div className="player">
        <div className="time-control">
            <p>Start Time</p>
            <i type="range" />
            <p>End Time</p>
        </div>
        <div className="player-control"></div>
    </div>
    )
}

export default Player

