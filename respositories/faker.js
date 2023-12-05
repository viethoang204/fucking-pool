import { Challenge, User } from "../models/index.js"
import { faker } from '@faker-js/faker'
import { print } from "../helpers/print.js"
import mongoose from "mongoose"

// Generate 1000 fake Users
async function generateFakeUsers() {
    for (let i = 0; i < 100; i++) {
        [...Array(150).keys()].forEach(async index => {
            let fakeUser = new User({
                _id: new mongoose.Types.ObjectId,
                name: faker.person.fullName(),
                phone: faker.phone.number('09########'),
                avatar: faker.image.avatar(),
            })
            await fakeUser.save()
            print(`Đã thêm user fake với tên ${fakeUser.name}`)
        })
    }
}

// Tạo 100 fake challenge
async function generateFakeChallenges() {
    // Tạo list ID từ từ userID
    const listID = []
    const ob = await User.find(
        // {},
        // {
        //     name: 0,
        //     level: 0,
        //     exp: 0,
        //     stamina: 0,
        //     gold: 0,
        //     phone: 0,
        //     avatar: 0
        // }
    )
    for (let i = 0; i < 1000; i++) {
        listID.push(ob[i]._id.toString())
    }
    
    for (let i = 0; i < 10; i++) {
        [...Array(10).keys()].forEach(async index => {
            const creator = await User.findOne(
                {'_id': faker.string.fromCharacters(listID)}
            )
            let fakeChallenge = {
                name: faker.string.sample(50),
                detail: faker.string.sample(100),
                status: faker.string.fromCharacters(['0','1','2']),
                totalPlayers: 0,
                totalGold: 0,
                totalGoldOpt1: 0,
                totalGoldOpt2: 0,
                playersOpt1: 0,
                playersOpt2: 0,
                config: {
                    opt1: faker.string.sample(15),
                    opt2: faker.string.sample(15),
                    startDate: faker.date.anytime(),
                    endDate: faker.date.anytime(),
                    handicap: faker.number.float({ max: 5 , precision: '0.01'}),
                    optHandicap: faker.number.int({ min: 1, max: 2}),
                    limitGold: faker.datatype.boolean(),
                    minGold: faker.number.int({ min: 0, max: 10000 }),
                    maxGold: faker.number.int({ min: 10001, max: 999999}),
                },
                creator: {
                    id: creator._id,
                    name: creator.name,
                    avatar: creator.avatar
                },
                listPlayer: []
            //     // opt1: faker.string.sample(20),
            //     // opt2: faker.string.sample(20),
            //     // startDate: faker.date.anytime(),
            //     // endDate: faker.date.anytime(),
            //     // handicap: faker.number.float({ max: 5 , precision: '0.01'}),
            //     // limitGold: faker.datatype.boolean(),
            //     // minGold: faker.number.int({ min: 0, max: 999999 }),
            //     // maxGold: faker.number.int({ min: 0, max: 999999 }),
            //     // creatorId: faker.string.fromCharacters(listID)
            }
            await Challenge.create(fakeChallenge)
            print(`Đã thêm challenge với tên ${fakeChallenge.name}`)
        })
    }
}

// Tạo fake data User_Challenge
async function generateFakeUserChallenge() {
    const listUserID = []
    const userID = await User.find(
        {},
        {
            name: 0,
            level: 0,
            exp: 0,
            stamina: 0,
            gold: 0,
            phone: 0,
            avatar: 0
        }
    )
    for (let i = 0; i < 500; i++) {
        listUserID.push(userID[i]._id.toString())
    }
    
    const listChallengeID = []
    const challengeId = await Challenge.find(
        {},
        {
            name: 0,
            detail: 0,
            opt1: 0,
            opt2: 0,
            startDate: 0,
            endDate: 0,
            handicap: 0,
            limitGold: 0,
            minGold: 0,
            maxGold: 0,
            creatorId: 0,
        }
    )
    for (let k = 0; k < 50; k++) {
        listChallengeID.push(challengeId[k]._id.toString())
    }
    for (let l = 0; l < 100; l++) {
        [...Array(100).keys()].forEach(async index => {
            const opt1 = faker.datatype.boolean()
            const opt2 = !opt1;
            let fakeUserChallenge = {
                userId: faker.string.fromCharacters(listUserID),
                challengeId: faker.string.fromCharacters(listChallengeID),
                gold: faker.number.int({ min: 0, max: 999999 }),
                opt1: opt1,
                opt2: opt2
            }
            // console.log(fakeUserChallenge)
            await UserChallenge.create(fakeUserChallenge)
            print(`Đã thêm challenge với tên ${fakeUserChallenge.userId}`)
        })
    }
}

export default {
    generateFakeChallenges,
    generateFakeUsers,
    generateFakeUserChallenge
}