import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model('challenges',
    new Schema({
        id: { type: ObjectId },
        name: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            required: false,
        },
        status: { // 0: chưa diễn ra, 1: đang diễn ra, 2: đã kết thúc
            type: Number,
            required: true,
            default: 0
        },
        totalPlayers: {
            type: Number,
            required: true,
            default: 0
        },
        totalGold: {
            type: Number,
            required: true,
            default: 0,
            // set(value) {
            //     const totalGold = this.listPlayers.reduce((acc, player) => {
            //         return acc + player.gold;
            //     }, 0);

            //     if (value !== totalGold) {
            //         this.set('totalGold', totalGold);
            //     }
            // },
        },
        totalGoldOpt1: {
            type: Number,
            required: true,
            default: 0
        },
        totalGoldOpt2: {
            type: Number,
            required: true,
            default: 0
        },
        playersOpt1: {
            type: Number,
            required: false,
            default: 0
        },
        playersOpt2: {
            type: Number,
            required: false,
            default: 0
        },
        config: {
            opt1: {
                type: String,
                required: true
            },
            opt2: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            handicap: { // tỉ lệ chấp
                type: Number,
                required: true
            },
            optHandicap: { // lựa chọn chấp
                type: Number,
                required: true
            },
            limitGold: {
                type: Boolean,
                required: true
            },
            minGold: {
                type: Number,
                required: false,
                default: 0
            },
            maxGold: {
                type: Number,
                required: false,
                default: 0
            }
        },
        creator: {
            id: {
                type: ObjectId,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }
        },
        listPlayers: [
            {
                id: ObjectId,
                name: String,
                avatar: String,
                opt: Number,
                gold: Number,
                joinedDate: Date
            },
        ]
    },
        { versionKey: false })
)