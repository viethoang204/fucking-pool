import cron from 'node-cron'
import mongoose from 'mongoose';
import { print, OutputType } from "../helpers/print.js";
import { Team, Event, StandingPrediction, Standing, Odd, Tournament, Round } from "../models/index.js"
import connect from '../database/database.js';
import { range } from 'underscore';
import { BASE_POINT, LIST_ID_CURRENT_TOURNAMENT } from '../global/constants.js';

var listIdTournament = LIST_ID_CURRENT_TOURNAMENT

async function updateRound() {
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

        print('Running updateRound... ', OutputType.WARNING)

        for (let k = 0; k < infoTournament.length; k++) {
            const listEvents = await Event.find(
                {
                    round: infoTournament[k].round,
                    'tournament._id': infoTournament[k].idTournament
                }
            )

            let name = 'Vòng ' + infoTournament[k].round

            const tournament = await Tournament.findOne({ _id: infoTournament[k].idTournament })

            let status = {
                "code": 200,
                "description": "Đang mở",
                "color": "#0D6EFD"
            }

            let listStartTime = []
            let maxRewards = 0
            for (let i = 0; i < listEvents.length; i++) {
                listStartTime.push(listEvents[i].startTimestamp)
            }
            for (let j = 0; j < listEvents.length; j++) {
                maxRewards += listEvents[j].odd.weak
            }
            print(maxRewards)

            let startTimestamp = Math.min(...listStartTime)
            let endTimestamp = Math.max(...listStartTime) + 7800

            const newRound = new Round({
                _id: new mongoose.Types.ObjectId,
                name: name,
                tournament: tournament,
                round: infoTournament[k].round,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp,
                status: status,
                maxRewards: maxRewards * BASE_POINT,
                events: listEvents
            })

            newRound.save()
                .then((result) => {
                    console.log('Data inserted successfully:' + k);
                })
                .catch((error) => {
                    console.error('Error inserting data:', error);
                })
        }


    } catch (error) {
        print(error.message, OutputType.ERROR)
    }
}

export default updateRound