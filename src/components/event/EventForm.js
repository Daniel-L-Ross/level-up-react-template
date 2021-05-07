import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"
import { GameContext } from "../game/GameProvider"


export const EventForm = () => {
    const history = useHistory()
    const { events, getEvents, createEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)

    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = event => {
        const newEvent = {...currentEvent}
        let selectedValue = event.target.value
        newEvent[event.target.name] = selectedValue
        setEvent(newEvent)
    }
    
    const handleClickSaveEvent = event => {
        event.preventDefault()
        const gameId = parseInt(currentEvent.gameId)
        if (gameId === 0){
            window.alert("Please select a location")
        } else {
            createEvent({
                gameId: parseInt(currentEvent.gameId),
                date: currentEvent.date,
                time: currentEvent.time,
                description: currentEvent.description
            })
        }
    }


    return (
        <form className="gameForm" onSubmit={handleClickSaveEvent}>
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState } required>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id} key={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of event: </label>
                    <input type="date" id="date" name="date" onChange={changeEventState} className="form-control" value={currentEvent.date} required />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of event: </label>
                    <input type="time" id="time" name="time" onChange={changeEventState} className="form-control" value={currentEvent.time} required />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event description: </label>
                    <input type="text" id="description" name="description" onChange={changeEventState} className="form-control" value={currentEvent.description} placeholder="Enter your description here." required />
                </div>
            </fieldset>

            <button type="submit">Create Event</button>
        </form>
    )
}