import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGenres, genres, getSingleGame, updateGame } = useContext(GameContext)

    const { gameId } = useParams()

    const [isLoading, setIsLoading] = useState(true)

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 1,
        title: "",
        maker: "",
        genreId: 0
    })

    useEffect(() => {
        getGenres().then(() => {
            if (gameId) {
                getSingleGame(gameId)
                    .then(game => setCurrentGame({
                        skillLevel: game.skill_level,
                        numberOfPlayers: game.number_of_players,
                        title: game.title,
                        maker: game.maker,
                        genreId: game.genre.id,
                        id: game.id
                    }),
                        setIsLoading(false)
                    )
            } else {
                setIsLoading(false)
            }
        })
    }, [])


    const changeGameState = event => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    const handleClickSaveGame = event => {
        event.preventDefault()
        setIsLoading(true)

        const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            genreId: parseInt(currentGame.genreId)
        }
        if (gameId) {
            game.id = currentGame.id
            updateGame(game)
            .then(() => history.push("/"))
        } else {
            createGame(game)
                .then(() => history.push("/"))
        }
    }

    return (
        <form className="gameForm" onSubmit={handleClickSaveGame}>
            <h2 className="gameForm__title">{gameId ? "Edit Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control" placeholder="Enter game title here..."
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="genreId">Genre: </label>
                    <select name="genreId" className="form-control"
                        value={currentGame.genreId}
                        onChange={changeGameState}
                        required>
                        <option value="0">Select a genre...</option>
                        {
                            genres.map(genre => (
                                <option value={genre.id} key={genre.id}>{genre.label}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players 1-25: </label>
                    <input type="number" name="numberOfPlayers" className="form-control" min="1" max="25" required autoFocus
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level 1-5: </label>
                    <input type="number" name="skillLevel" className="form-control" min="1" max="5" required autoFocus
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control" placeholder="Enter maker name here..."
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <button className="btn btn-2 btn-primary"
                type="submit"
                disabled={isLoading}>{gameId ? "Update" : "Create"}</button>
        </form>
    )
}