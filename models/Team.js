import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('team',
    new Schema({
        id: {
            type: mongoose.Types.ObjectId,
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
        shortName: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
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
        },
        userCount: {
            type: Number,
            require: false
        },
        nameCode: {
            type: String,
            require: true
        },
        country: {
            id: { type: ObjectId },
            name: {
                type: String,
                require: true
            },
            slug: {
                type: String,
                require: true
            },
            alpha2: {
                type: String,
                require: true
            }
        }
    },
        { versionKey: false })
)