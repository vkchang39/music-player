import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = () => {
    return (
    <div className="player">
        <div className="time-control">
            <p>Start Time</p>
            <input type="range" />
            <p>End Time</p>
        </div>
        <div className="player-control"></div>
        <FontAwesomeIcon className="skip-back" size="2x" icon = {faAngleLeft} />
        <FontAwesomeIcon className="play" size="2x" icon = {faPlay} />
        <FontAwesomeIcon className="skip-forword" size="2x" icon = {faAngleRight} />
    </div>
    )
}

export default Player

