import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button
                    className="btn btn-2 btn-primary"
                    onClick={() => props.history.push('/events/create')}>Create New Event</button>
            </header>
            {
                events.map(event => {
                    // const attending = profile.events.some(evt => evt.id ===event.id)
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                            }
                            @ {event.time}
                        </div>
                        <div>Attendance Count: {event.attendees_count}</div>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id)}
                                >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id)}
                                >Join</button>
                        }
                    </section>
                })
            }
        </article >
    )
}