import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('currentRounds',
    new Schema({
        id: { type: ObjectId },
        info: [
            {
                idTournament: { type: String},
                slug: { type: String},
                pastWeek: { type: Number},
                postponeMatches: {},
                upcomingWeek: { type: Number}
            }
        ]
    },
        { versionKey: false })
)