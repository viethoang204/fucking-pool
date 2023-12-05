import cron from 'node-cron'
import mongoose from 'mongoose';
import { print, OutputType } from "../helpers/print.js";
import { Team, Event, StandingPrediction, Standing, Odd, Tournament } from "../models/index.js"
import connect from '../database/database.js';
import { BASE_POINT, LIST_ID_CURRENT_TOURNAMENT } from '../global/constants.js';

var listIdTournament = LIST_ID_CURRENT_TOURNAMENT

async function updateOdd() {
    try {
        const infoTournament = []
        for (let i = 0; i < listIdTournament.length; i++) {
            const round = await Tournament.findOne({ _id: listIdTournament[i] })
            const tour = {
                idTournament: listIdTournament[i],
                round: round.currentRound
            }
            infoTournament.push(tour)
        }

        print('Running updateOdd... ', OutputType.WARNING)

        for (let j = 0; j < infoTournament.length; j++) {
            const listMatchDiff = await Event.find(
                { round: infoTournament[j].round, 'tournament._id': infoTournament[j].idTournament },
                { matchDiff: 1, _id: 1 }
            )
            const odds = await Odd.find({})
            var listOdds = odds[0].odd
            for (let i = 0; i < listMatchDiff.length; i++) {
                const eventId = listMatchDiff[i]._id
                const matchDiff = listMatchDiff[i].matchDiff
                print(matchDiff)

                // Check oddRange của matchDiff
                var range = 0
                var strong = 0
                var draw = 0
                var weak = 0
                for (let j = 0; j < listOdds.length; j++) {
                    const rangeOdd = listOdds[j].range
                    if (matchDiff < rangeOdd) {
                        range = rangeOdd
                        strong = listOdds[j].strong
                        draw = listOdds[j].draw
                        weak = listOdds[j].weak
                        break
                    }
                }
                print('range: ' + range)

                // update Odd vào Events
                const updateEventOdd = await Event.updateOne(
                    { _id: eventId },
                    {
                        $set: {
                            'odd.range': range,
                            'odd.strong': strong,
                            'odd.draw': draw,
                            'odd.weak': weak
                        }
                    }
                )
            }
        }

        print('Update Successfull!!!', OutputType.SUCCESS)
        print('----------')
    } catch (error) {
        print(error.message, OutputType.ERROR)
    }
}

export default updateOdd