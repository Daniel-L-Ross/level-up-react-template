import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { EventForm } from "./event/EventForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events" render={(props) => {
                    return <>
                        <EventList history={props.history} />
                    </>
                }} />
                <GameProvider>
                    <Route exact path="/events/create" render={(props) => {
                        return <EventForm {...props} />
                    }} />
                </GameProvider>
            </EventProvider>
        </main>
    </>
}
