import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('uniqueTournament',
    new Schema({
        id: {
            type: ObjectId,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
        },
        userCount: {
            type: Number,
            require: false
        },
        category: {
            id: {
                type: ObjectId,
                require: true
            },
            name: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            },
            sport: {
                id: {
                    type: ObjectId,
                    require: true
                },
                name: {
                    type: String,
                    require: true
                }
            }
        },
        color: {
            type: String,
            require: false
        }
    },
        { versionKey: false })
)