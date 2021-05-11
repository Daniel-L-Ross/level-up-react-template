import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ genres, setGenres ] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const getSingleGame = gameId => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const getGenres = () => {
        return fetch("http://localhost:8000/genres", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGenres)
    }

    const createGame = newGame => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
            .then(getGames)
    }

    const updateGame = game => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    return (
        <GameContext.Provider value={{ games, getGames, genres, getGenres, createGame, getSingleGame, updateGame }} >
            { props.children }
        </GameContext.Provider>
    )
}