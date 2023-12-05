import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('odd',
    new Schema({
        id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            require: true
        },
        odd: [
            {
                range: {
                    type: Number,
                    require: false
                },
                strong: {
                    type: Number,
                    require: false
                },
                draw: {
                    type: Number,
                    require: false
                },
                weak: {
                    type: Number,
                    require: false
                }
            }
        ]
    },
        { versionKey: false })
)