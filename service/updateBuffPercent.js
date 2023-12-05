import cron from 'node-cron'
import mongoose from 'mongoose';
import { print, OutputType } from "../helpers/print.js";
import { Team, Event, StandingPrediction, Standing, Tournament } from "../models/index.js"
import connect from '../database/database.js';
import { BASE_POINT, LIST_ID_CURRENT_TOURNAMENT } from '../global/constants.js';

var listIdTournament = LIST_ID_CURRENT_TOURNAMENT

async function updateBuffPercent() {
  try {
    const infoTournament = []
    for (let i = 0; i < listIdTournament.length; i++) {
      const round = await Tournament.findOne({ _id: listIdTournament[i] })
      const tour = {
        idTournament: listIdTournament[i],
        round: round.currentRound - 1
      }
      infoTournament.push(tour)
    }
    console.log(infoTournament)
    print('Running updateBuffPercent... ', OutputType.WARNING)

    for (let j = 0; j < infoTournament.length; j++) {
      // Tính tổng userCount của các team
      const sumUserCount = await Standing.aggregate([
        {
          $match: {
            'tournament._id': new mongoose.Types.ObjectId(infoTournament[j].idTournament),
            round: infoTournament[j].round
          },
        },
        {
          $group: {
            _id: null,
            totalUserCount: { $sum: '$team.userCount' },
          },
        },
      ])

      // Tính tổng userCount của giải
      let totalUserCount = sumUserCount[0].totalUserCount
      print('Total userCount: ' + totalUserCount)

      const listIdTeam = await Standing.find(
        {
          'tournament._id': infoTournament[j].idTournament,
          round: infoTournament[j].round
        },
        { _id: 1 }
      )

      for (let i = 0; i < listIdTeam.length; i++) {
        try {
          const userCountTeam = await Standing.find(
            { _id: new mongoose.Types.ObjectId(listIdTeam[i]._id) },
            { 'team.userCount': 1 }
          )
          const userCountTeamInt = userCountTeam[0].team.userCount
          const buffPercent = (userCountTeamInt / totalUserCount).toFixed(4)
          await Standing.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(listIdTeam[i]._id) },
            { $set: { buffPercent: buffPercent } }
          )
        } catch (error) {
          print(error.message, OutputType.ERROR)
        }
      }
    }

    print('Update Successfull!!!', OutputType.SUCCESS)
    print('----------')
  } catch (error) {
    print(error.message, OutputType.ERROR);
  }
}



export default updateBuffPercent



