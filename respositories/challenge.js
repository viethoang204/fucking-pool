import { Challenge, User } from "../models/index.js"
import { faker } from '@faker-js/faker'
import { print } from "../helpers/print.js"
import { config, parse } from "dotenv"
import user from "./user.js"
import { ObjectId } from 'mongodb';

// List tất cả thử thách + chia trang
const getALlChallenges = async ({
	page,
	size,
	searchString,
	status,
}) => {
	page = parseInt(page)
	size = parseInt(size)
	status = parseInt(status)

	//aggregate data for all challenges
	let filteredChallenges = await Challenge.aggregate([
		{
			$match: {
				status: status,
				$or: [
					{
						name: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
					},
					{
						detail: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
					},
				]
			},
		},
		{ $skip: (page - 1) * size },
		{ $limit: size },
	])
	return filteredChallenges
}

// Lọc thử thách theo id
const getDetailChallenge = async (challengeId) => {
	try {
		const challenge = await Challenge.findById(challengeId)
		return challenge
	} catch (exception) {
		console.log(exception)
	}
}

//Tạo thử thách
const insertChallenge = async ({
	name,
	detail,
	opt1,
	opt2,
	startDate,
	endDate,
	handicap,
	optHandicap,
	limitGold,
	minGold,
	maxGold,
	creatorId,
}) => {
	try {
		const infoCreator = await User.findOne({
			_id: creatorId
		})
		const challenge = await Challenge.create({
			name,
			detail,
			config: {
				opt1,
				opt2,
				startDate,
				endDate,
				handicap,
				optHandicap,
				limitGold,
				minGold,
				maxGold,
			},
			creator: {
				id: infoCreator._id,
				name: infoCreator.name,
				avatar: infoCreator.avatar
			},
			listPlayers: []
		})
		return challenge
	} catch (exception) {
		console.log(exception)
	}
}

// Tham gia thử thách
const joinChallenge = async ({
	challengeId,
	playerId,
	playerOpt,
	playerGold,
}) => {
	try {
		const infoPlayer = await User.findOne({
			_id: playerId
		})
		const join = await Challenge.updateOne(
			{ _id: challengeId },
			{
				$push: {
					listPlayers: {
						_id: infoPlayer._id,
						name: infoPlayer.name,
						avatar: infoPlayer.avatar,
						opt: playerOpt,
						gold: playerGold,
						joinedDate: new Date()
					}
				}
			}
		)
		return join
	} catch (exception) {
		console.log(exception)
	}
}

//Chỉnh sửa challenge
const updateChallenge = async ({
	challengeId,
	name,
	detail,
	opt1,
	opt2,
	startDate,
	endDate,
	handicap,
	optHandicap,
	limitGold,
	minGold,
	maxGold,
}) => {
	try {
		const update = await Challenge.findByIdAndUpdate(
			challengeId,
			{
				"$set": {
					"name": name || undefined,
					"detail": detail || undefined,
					"config.opt1": opt1 || undefined,
					"config.opt2": opt2 || undefined,
                    "config.startDate": startDate || undefined,
                    "config.endDate": endDate || undefined,
                    "config.handicap": handicap || undefined,
                    "config.optHandicap": optHandicap || undefined,
					"config.limitGold": limitGold || undefined,
                    "config.minGold": minGold || undefined,
                    "config.maxGold": maxGold || undefined
				}
			}
		)
		const challenge = await Challenge.findById(challengeId)
		return challenge
	} catch (exception) {
		console.log(exception)
	}
}

const updateStatusChallenge = async (challengeId) => {
	try {
		const challenge = await Challenge.findById(challengeId)
		const update = await Challenge.updateOne(
			{ _id: challengeId },
			{
				$set: {
					totalPlayers: challenge.listPlayers.length,
					totalGold: challenge.listPlayers.reduce((acc, player) => acc + player.gold, 0),
					totalGoldOpt1: challenge.listPlayers.filter(player => player.opt === 1).reduce((acc, player) => acc + player.gold, 0),
					totalGoldOpt2: challenge.listPlayers.filter(player => player.opt === 2).reduce((acc, player) => acc + player.gold, 0),
					playersOpt1: challenge.listPlayers.filter(player => player.opt === 1).length,
					playersOpt2: challenge.listPlayers.filter(player => player.opt === 2).length
				}
			}
		)
		return update
	} catch (exception) {
		console.log(exception)
	}
}

export default {
	getALlChallenges,
	insertChallenge,
	getDetailChallenge,
	joinChallenge,
	updateChallenge,
	updateStatusChallenge
}