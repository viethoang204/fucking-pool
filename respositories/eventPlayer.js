import { EventPlayer, Round, User } from "../models/index.js"
import Exception from "../exceptions/Exception.js"
import { print } from "../helpers/print.js"
import mongoose from 'mongoose';

const getAllEventPlayer = async ({ resultCode, playerId }) => {
    try {
        function formatRes(allEventPlayer) {
            const list = []
            for (let i = 0; i < allEventPlayer.length; i++) {
                const event = {
                    _id: allEventPlayer[i]._id,
                    resultCode: allEventPlayer[i].totalResult.code,
                    resultName: allEventPlayer[i].totalResult.description,
                    tournamentName: allEventPlayer[i].round.tournament.name,
                    roundName: allEventPlayer[i].round.name,
                    tournamentImage: allEventPlayer[i].round.tournament.image,
                    tournamentColor: allEventPlayer[i].round.tournament.uniqueTournament.color,
                    totalReward: allEventPlayer[i].totalReward,
                    rewardedAtTimestamp: allEventPlayer[i].rewardedAtTimestamp
                }
                list.push(event)
            }
            return list
        }
        if (!resultCode) {
            let allEventPlayer = await EventPlayer.find({
                'totalResult.code': {$ne: null },
                playerId: playerId,
            }).sort({"joinAtTimestamp": -1})
            return formatRes(allEventPlayer)
        } else {
            let allEventPlayer = await EventPlayer.find({
                'totalResult.code': resultCode,
                playerId: playerId
            }).sort({"joinAtTimestamp": -1})
            return formatRes(allEventPlayer)
        }
    } catch (exception) {
        console.log(exception)
    }
}

const getDetailEventPlayer = async ({
    eventPlayerId,
}) => {
    try {
        let eventPlayer = await EventPlayer.findOne(
            { _id: eventPlayerId }
        )
        if (eventPlayer) {
            const postponedEvents = []
            const winEvents = []
            const loseEvents = []
            const listEvents = eventPlayer.round.events
            for (let i = 0; i < listEvents.length; i++) {
                const odd = listEvents[i].odd
                var oddHomeTeam
				var oddAwayTeam
				if (listEvents[i].strongerTeam == 1 ) {
					oddHomeTeam = odd.strong
					oddAwayTeam = odd.weak
				} else {
					oddHomeTeam = odd.weak
					oddAwayTeam = odd.strong
				}
                const event = {
                    _id: listEvents[i]._id,
                    eventStatusCode: listEvents[i].status.code,
                    eventStatusName: listEvents[i].status.name,
                    draw: listEvents[i].odd.draw,
                    startTimestamp: listEvents[i].startTimestamp,
                    winnerCode: listEvents[i].winnerCode ? listEvents[i].winnerCode : null,
                    playerChoice: listEvents[i].playerChoice ? listEvents[i].playerChoice : null,
                    playerChoice: listEvents[i].playerChoice ? listEvents[i].playerChoice : null,
                    eventResultCode: listEvents[i].result.code,
                    eventResultName: listEvents[i].result.description,
                    eventResultColor: listEvents[i].resultCode,
                    eventReward: listEvents[i].reward,
                    homeTeam: {
                        _id: listEvents[i].homeTeam._id,
                        name: listEvents[i].homeTeam.shortName,
                        logo: listEvents[i].homeTeam.image,
                        odd: oddHomeTeam,
                    },
                    awayTeam: {
                        _id: listEvents[i].awayTeam._id,
                        name: listEvents[i].awayTeam.shortName,
                        logo: listEvents[i].awayTeam.image,
                        odd: oddAwayTeam
                    }
                }
                if (event.eventResultCode == 1) {
                    winEvents.push(event)
                } else if (event.eventResultCode == 0) {
                    loseEvents.push(event)
                } else {
                    postponedEvents.push(event)
                }
            }
            const detail = {
                _id: eventPlayer._id,
                resultCode: eventPlayer.totalResult.code,
                resultName: eventPlayer.totalResult.description,
                tournamentName: eventPlayer.round.tournament.name,
                roundName: eventPlayer.round.name,
                tournamentImage: eventPlayer.round.tournament.image,
                tournamentColor: eventPlayer.round.tournament.uniqueTournament.color,
                totalReward: !eventPlayer.totalReward ? eventPlayer.totalReward : null,
                rewardedAtTimestamp: eventPlayer.rewardedAtTimestamp ? eventPlayer.rewardedAtTimestamp : null,
                totalPostponedEvents: postponedEvents.length,
                postponedEventsColor: "#17A2B8",
                totalWinEvents: winEvents.length,
                winEventsColor: "#28A745",
                totalLoseEvents: loseEvents.length,
                loseEventsColor: "#DC3545",
                postponedEvents: postponedEvents,
                winEvents: winEvents,
                loseEvents: loseEvents
            }
            return detail
        }
        // return detailEventPlayer
    } catch (exception) {
        console.log(exception)
    }
}

const joinGame = async ({
    playerId,
    roundId,
    choices
}) => {
    try {
        let result
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const infoRound = await Round.findOne({ _id: roundId })
        if (!infoRound) {
            result = "roundId không tồn tại"
            return result
        } else {
            const joinInfo = new EventPlayer({
                _id: new mongoose.Types.ObjectId,
                playerId: playerId,
                joinAtTimestamp: currentTimestamp,
                round: infoRound,
                totalResult: {
                    code: null,
                    description: null,
                    win: null,
                    lose: null
                },
                totalReward: null,
                rewardedAtTimestamp: null
            })

            result = joinInfo._id

            joinInfo.save()
                .then(async (result) => {
                    for (let i = 0; i < choices.length; i++) {
                        const eventId = choices[i].eventId;
                        const choice = choices[i].choice
                        const updatedJoin = await EventPlayer.findOneAndUpdate(
                            { _id: joinInfo._id, 'round.events._id': eventId },
                            {
                                $set: {
                                    'round.events.$.playerChoice': choice
                                }
                            },
                            { new: true }
                        )
                    }
                })
                .catch((error) => {
                    console.error('Error inserting data:', error);
                })

            return result
        }


    } catch (error) {
        print(error.message)
    }
}



export default {
    getAllEventPlayer,
    joinGame,
    getDetailEventPlayer
}