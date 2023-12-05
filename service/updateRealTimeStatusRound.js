import { print, OutputType } from "../helpers/print.js";
import { EventPlayer, Round } from "../models/index.js";

async function updateRealTimeStatusRound() {
    try {
        const currentTime = Math.floor(Date.now() / 1000);
        const allCurrentRounds = await Round.find({
            'status.code': 200
        }, { _id: 1, startTimestamp: 1 })
        if (allCurrentRounds.length > 0) {
            for (let i = 0; i < allCurrentRounds.length; i++) {
                const startTimestampRound = allCurrentRounds[i].startTimestamp
                if (currentTime > startTimestampRound) {
                    const updateStatusRound = await Round.updateOne(
                        { _id: allCurrentRounds[i]._id },
                        {
                            $set: {
                                'status.code': 300,
                                'status.description': "Đã đóng",
                                'status.color': "#FD7E14"
                            }
                        }
                    )
                    if (updateStatusRound.modifiedCount > 0) {
                        console.log("Updated Status Round")
                    }
                    const updateStatusRoundEventPlayer = await EventPlayer.updateMany(
                        { 'round._id': allCurrentRounds[i]._id},
                        {
                            $set: {
                                'round.status.code': 300,
                                'round.status.description': "Đã đóng",
                                'round.status.color': "#FD7E14"
                            }
                        }
                    )
                    if (updateStatusRoundEventPlayer.modifiedCount > 0) {
                        console.log("Updated Status Round Eventplayers")
                    }
                } else {
                    console.log("Don't need update")
                }

            }
        } else {
            console.log("Don't have current rounds")
        }
        // print(allCurrentRounds)


    } catch (error) {
        console.log(error);
    }
}

export default updateRealTimeStatusRound