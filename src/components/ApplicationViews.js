import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"
import { GameForm } from "./game/GameForm"
import { GameProvider } from "./game/GameProvider"
import { EventForm } from "./event/EventForm"
import { Profile } from "./profile/Profile"
import { ProfileProvider } from "./profile/ProfileProvider"

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
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/:gameId/edit">
                    <GameForm />
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

            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
