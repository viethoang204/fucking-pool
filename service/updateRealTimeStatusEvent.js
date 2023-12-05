import { print, OutputType } from "../helpers/print.js";
import { EventPlayer, Round, Event } from "../models/index.js";

async function updateRealTimeStatusEvent() {
    try {
        const currentTime = Math.floor(Date.now() / 1000);
        const allCurrentEvents = await Event.find(
            { 'status.code': 0 },
            { _id: 1, startTimestamp: 1 }
        )
        if (allCurrentEvents.length > 0) {
            for (let i = 0; i < allCurrentEvents.length; i++) {
                const eventId = allCurrentEvents[i]._id
                const eventStartTime = allCurrentEvents[i].startTimestamp
                const eventEndTime = eventStartTime + 7800
                if (currentTime > eventStartTime) {
                    if (currentTime < eventEndTime) {
                        const updateStatusLiveEvents = await Event.updateOne(
                            { _id: eventId },
                            {
                                $set: {
                                    'status.code': 200,
                                    'status.description': "Đang diễn ra"
                                }
                            }
                        )
                        const updateStatusLiveRounds = await Round.updateMany(
                            { 'events._id': eventId },
                            {
                                $set: {
                                    'events.$.status.code': 200,
                                    'events.$.status.description': "Đang diễn ra"
                                }
                            }
                        )
                        const updateStatusLiveEventPlayers = await EventPlayer.updateMany(
                            { 'round.events._id': eventId},
                            {
                                $set: {
                                    'round.events.$.status.code': 200,
                                    'round.events.$.status.description': "Đang diễn ra"
                                }
                            }
                        )
                    } else {
                        const updateStatusEndEvents = await Event.updateOne(
                            { _id: eventId },
                            {
                                $set: {
                                    'status.code': 100,
                                    'status.description': "Kết thúc"
                                }
                            }
                        )
                        const updateStatusEndRounds = await Round.updateMany(
                            { 'events._id': eventId },
                            {
                                $set: {
                                    'events.$.status.code': 100,
                                    'events.$.status.description': "Kết thúc"
                                }
                            }
                        )
                        const updateStatusEndEventPlayers = await EventPlayer.updateMany(
                            { 'round.events._id': eventId},
                            {
                                $set: {
                                    'round.events.$.status.code': 100,
                                    'round.events.$.status.description': "Kết thúc"
                                }
                            }
                        )
                    }
                    console.log("Updated Status Events")
                }
            }
        } else {
            console.log("Don't need update event")
        }
    } catch (error) {
        console.log(error);
    }
}

export default updateRealTimeStatusEvent