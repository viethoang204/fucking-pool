import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('category',
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
        sport: {
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
            }
        }
    },
        { versionKey: false })
)