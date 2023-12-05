import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('country',
    new Schema({
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
    },
        { versionKey: false })
)