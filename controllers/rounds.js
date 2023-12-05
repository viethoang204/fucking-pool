import StatusCode from '../exceptions/StatusCode.js'
import { roundRepository } from '../respositories/index.js'
import { MAX_RECORDS } from '../global/constants.js'
import { print } from '../helpers/print.js'
import jwtDecode from 'jwt-decode'


async function getAllRound(req, res) {
    // let {status = null} = req.query
    const playerId = jwtDecode(req.headers.authorization).sub
    const request = {status: req.query.status, playerId: playerId}
    if (playerId) {
        try {
            let filteredCurrentGame = await roundRepository.getAllRound(request)
            if (filteredCurrentGame) {
                res.status(StatusCode.OK).json({
                    total: filteredCurrentGame.length,
                    data: filteredCurrentGame
                })
            } else {
                res.status(StatusCode.NOT_FOUND).json({
                    message: 'Not found'
                })
            }
        } catch (exception) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message: exception.message
            })
        }
    } else {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: 'Authorization failed'
        })
    }
}

async function getDetailRound(req, res) {
    const playerId = jwtDecode(req.headers.authorization).sub
    const roundId = req.query.roundId
    const request = {playerId: playerId, roundId: roundId}
    if (playerId) {
        let detailRound = await roundRepository.getDetailRound(request)
        if (detailRound) {
            res.status(StatusCode.OK).json({
                total: detailRound.length,
                data: detailRound
            })
        } else {
            res.status(StatusCode.NOT_FOUND).json({
                message: 'Not found'
            })
        }
    } else {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: 'Authorization failed'
        })
    }
}

export default {
    getAllRound,
    getDetailRound
}