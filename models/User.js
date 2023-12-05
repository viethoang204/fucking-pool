import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('users',
    new Schema({
        _id: { 
            type: ObjectId, 
            require: true 
        },
        name: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        avatar: {
            type: String,
            required: false
        },
    },
        { versionKey: false })
)