import { EventPlayer, Round } from "../models/index.js"
import { print } from "../helpers/print.js"
import { MIN_NUMBER_WINS, BASE_POINT } from "../global/constants.js"
import { param } from "express-validator"

const getAllRound = async ({
	status,
	playerId
}) => {
	try {
		async function formatData(filteredRound) {
			const listRound = []
			for (let i = 0; i < filteredRound.length; i++) {
				if (filteredRound[i]) {
					let joined
					const checkJoined = await EventPlayer.findOne({
						playerId: playerId,
						'round._id': filteredRound[i]._id
					})
					if(checkJoined) {
						joined = true
					} else {
						joined = false
					}
					const data = {
						_id: filteredRound[i]._id,
						roundName: filteredRound[i].name,
						tournamentName: filteredRound[i].tournament.name,
						statusName: filteredRound[i].status.description,
						statusCode: filteredRound[i].status.code,
						statusColor: filteredRound[i].status.color,
						joined: joined,
						tournamentImage: filteredRound[i].tournament.image,
						tournamentColor: filteredRound[i].tournament.uniqueTournament.color,
						maxRewards: filteredRound[i].maxRewards,
						closedPeriod: filteredRound[i].startTimestamp,
						endedPeriod: filteredRound[i].endTimestamp
					}
					listRound.push(data)
				}
			}
			return listRound
		}
		if (!status) {
			let filteredRound = await Round.find(
				{},
				{ events: 0 }
			).sort({"endTimestamp": -1})
			return formatData(filteredRound)
		} else {
			let filteredRound = await Round.find(
				{ 'status.code': status },
				{ events: 0 }
			).sort({"endTimestamp": -1})
			return formatData(filteredRound)
		}
	} catch (error) {
		print(error)
	}
}

const getDetailRound = async ({
	playerId,
	roundId
}) => {
	try {
		function formatRes(params, x) {
			let statusColor
			if (params.status.code == 200) {
				statusColor = "#0D6EFD"
			} else if (params.status.code == 300) {
				statusColor = "#FD7E14"
			} else if (params.status.code == 100) {
				statusColor = "#6610F2"
			} else if (params.status.code == 60) {
				statusColor = "#17A2B8"
			}
			const listEvents = []
			for (let i = 0; i < params.events.length; i++) {
				const odd = params.events[i].odd
				var oddHomeTeam
				var oddAwayTeam
				if (params.events[i].strongerTeam == 1 ) {
					oddHomeTeam = odd.strong
					oddAwayTeam = odd.weak
				} else {
					oddHomeTeam = odd.weak
					oddAwayTeam = odd.strong
				}
				const homeTeam = {
					_id: params.events[i].homeTeam._id,
					name: params.events[i].homeTeam.shortName,
					logo: params.events[i].homeTeam.image,
					odd: oddHomeTeam,
				}
				const awayTeam = {
					_id: params.events[i].awayTeam._id,
					name: params.events[i].awayTeam.shortName,
					logo: params.events[i].awayTeam.image,
					odd: oddAwayTeam,
				}
				let expectedReward
				if (params.events[i].playerChoice == 1) {
					expectedReward = homeTeam.odd * BASE_POINT
				} else if (params.events[i].playerChoice == 2) {
					expectedReward = awayTeam.odd * BASE_POINT
				} else if (params.events[i].playerChoice == 3) {
					expectedReward = params.events[i].odd.draw * BASE_POINT
				} else {
					expectedReward = null
				}
				const event = {
					_id: params.events[i]._id,
					eventStatusCode: params.events[i].status.code,
					eventStatusName: params.events[i].status.description,
					draw: params.events[i].odd.draw,
					startTimestamp: params.events[i].startTimestamp,
					homeTeam: homeTeam,
					awayTeam: awayTeam,
					winnerCode: params.events[i].winnerCode ? params.events[i].winnerCode : null,
					playerChoice: params.events[i].playerChoice ? params.events[i].playerChoice : null,
					expectedReward: expectedReward,
					eventResultCode: params.events[i].result ?  params.events[i].result.code : null,
					eventResultName: params.events[i].result ? params.events[i].result.description : null,
					startTimestamp: params.events[i].startTimestamp,
				}
				listEvents.push(event)
			}
			const res = {
				_id: params._id,
				tournamentName: params.tournament.name,
				roundName: params.name,
				statusName: params.status.description,
				statusCode: params.status.code,
				statusColor: statusColor,
				joined: listEvents[0].playerChoice ? true : false,
				roundResultCode: x ? x.totalResult.code : null,
				roundResultName: x ? x.totalResult.description : null,
				totalWinEvents: x ? x.totalResult.win : null,
				totalLoseEvents: x ? x.totalResult.lose: null,
				totalReward: x ? x.totalReward: null,
				tournamentImage: params.tournament.image,
				tournamentColor: params.tournament.uniqueTournament.color,
				maxRewards: params.maxRewards ? params.maxRewards : null,
				closedPeriod: params.startTimestamp,
				endedPeriod: params.endTimestamp,
				minimunNumberWins: MIN_NUMBER_WINS,
				basePoint: BASE_POINT,
				events: listEvents
			}
			return res
		}

		const checkJoined = await EventPlayer.findOne({
			playerId: playerId,
			'round._id': roundId
		})

		if (!checkJoined) {
			print('Chưa tham gia')
			let infoRound = await Round.findOne({ _id: roundId })
			let x = null
			return formatRes(infoRound, x)
		} else {
			console.log('Đã tham gia')
			let infoRound = checkJoined.round
			return formatRes(infoRound, checkJoined)
		}
	} catch (error) {
		print(error)
	}
}

export default {
	getAllRound,
	getDetailRound
}