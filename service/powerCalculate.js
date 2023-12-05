import cron from 'node-cron'
import mongoose from 'mongoose';
import { print, OutputType } from "../helpers/print.js";
import { Team, Event, StandingPrediction, Standing, Tournament } from "../models/index.js"
import connect from '../database/database.js';
import { BASE_POINT, LIST_ID_CURRENT_TOURNAMENT } from '../global/constants.js';

var listIdTournament = LIST_ID_CURRENT_TOURNAMENT

async function powerCalculate() {
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
        
        print('Running powerCalculate... ', OutputType.WARNING)

        for (let j = 0; j < infoTournament.length; j++) {
            const idTournament = infoTournament[j].idTournament
            const round = infoTournament[j].round
            // Tìm tất cả các events thuộc round hiện tại
            const events = await Event.find({
                'tournament._id': new mongoose.Types.ObjectId(idTournament),
                round: round
            }, { 'homeTeam._id': 1, 'awayTeam._id': 1 }
            )

            for (let i = 0; i < events.length; i++) {
                const homeTeamId = events[i].homeTeam._id
                const awayTeamId = events[i].awayTeam._id
                try {
                    // Tính presentPower
                    const homePresent = await Standing.findOne(
                        {
                            'tournament._id': idTournament,
                            'team._id': homeTeamId,
                            round: round - 1
                        },
                        { power: 1, _id: 0, buffPercent: 1 }
                    )
                    const awayPresent = await Standing.findOne(
                        {
                            'tournament._id': idTournament,
                            'team._id': awayTeamId,
                            round: round - 1
                        },
                        { power: 1, _id: 0 }
                    )
                    const homePresentPower = homePresent.power
                    const awayPresentPower = awayPresent.power
                    const homeBuffPercent = homePresent.buffPercent

                    // Tính predictionPower
                    const homePrediction = await StandingPrediction.find(
                        {
                            'tournament._id': idTournament,
                            'team._id': homeTeamId
                        },
                        { power: 1, _id: 0 }
                    )
                    const awayPrediction = await StandingPrediction.find(
                        {
                            'tournament._id': idTournament,
                            'team._id': awayTeamId
                        },
                        { power: 1, _id: awayTeamId }
                    )

                    const homePredictionPower = homePrediction[0].power
                    const awayPredictionPower = awayPrediction[0].power
                    print(homePredictionPower)
                    print(awayPredictionPower)

                    // Tính balancePower
                    const homePowerBalance = (((homePresentPower * 3) + (homePredictionPower * 7)) * (1 + homeBuffPercent)).toFixed(2)
                    const awayPowerBalance = (awayPresentPower * 3) + (awayPredictionPower * 7)

                    let strongerTeam
                    if (homePowerBalance > awayPowerBalance) {
                        strongerTeam = 1
                    } else {
                        strongerTeam = 2
                    }

                    // Tính matchDiff
                    const matchDiff = Math.abs(homePowerBalance - awayPowerBalance).toFixed(2)
                    print('matchDiff: ' + matchDiff)

                    // Update Event lên database
                    const updateMatchDiff = await Event.updateOne(
                        { _id: new mongoose.Types.ObjectId(events[i]._id) },
                        {
                            $set: {
                                matchDiff: matchDiff,
                                homePower: homePowerBalance,
                                awayPower: awayPowerBalance,
                                strongerTeam: strongerTeam
                            }
                        }
                    )
                } catch (error) {
                    print(error.message, OutputType.ERROR);
                }
            }
        }

        print('Update Successfull!!!', OutputType.SUCCESS)
        print('----------')
    } catch (error) {
        print(error.message, OutputType.ERROR);
    }
}

export default powerCalculate