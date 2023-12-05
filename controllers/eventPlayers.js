import { body } from 'express-validator'
import StatusCode from '../exceptions/StatusCode.js'
import { eventPlayerRepository } from '../respositories/index.js'
import { MAX_RECORDS } from '../global/constants.js'
import { print } from '../helpers/print.js'
import jwtDecode from 'jwt-decode'

async function getAllEventPlayer(req, res) {
    const playerId = jwtDecode(req.headers.authorization).sub
    const resultCode = req.query.resultCode
    const request = { playerId: playerId, resultCode: resultCode }
    if (playerId) {
        try {
            let listEventPlayer = await eventPlayerRepository.getAllEventPlayer(request)
            if (listEventPlayer) {
                res.status(StatusCode.OK).json({
                    total: listEventPlayer.length,
                    data: listEventPlayer,
                })
            } else {
                res.status(StatusCode.NOT_FOUND).json({
                    message: 'Not found',
                })
            }
        } catch (exception) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message: exception.message,
            })
        }
    } else {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: 'Authorization failed'
        })
    }

}

async function getDetailEventPlayer(req, res) {
    const playerId = jwtDecode(req.headers.authorization).sub
    const eventPlayerId = req.query.eventPlayerId
    const request = { eventPlayerId: eventPlayerId }
    if (playerId) {
        try {
            let detailEventPlayer = await eventPlayerRepository.getDetailEventPlayer(request)
            if (detailEventPlayer) {
                res.status(StatusCode.OK).json({
                    data: detailEventPlayer,
                })
            }
        } catch (exception) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message: exception.message,
            })
        }

    } else {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: 'Authorization failed'
        })
    }
}

async function joinGame(req, res) {
    const playerId = jwtDecode(req.headers.authorization).sub
    const roundId = req.body.roundId
    const choices = req.body.choices
    const request = { playerId: playerId, roundId: roundId, choices: choices }
    if (playerId) {
        try {
            const join = await eventPlayerRepository.joinGame(request)
            if (join) {
                res.status(StatusCode.INSERT_OK).json({
                    message: 'Tham gia thành công',
                    data: join
                })
            } else {
                res.status(StatusCode.BAD_REQUEST).json({
                    message: 'Tham gia không thành công',
                    data: join
                })
            }
        } catch (exception) {
            console.log(exception)
        }
    } else {
        res.status(StatusCode.UNAUTHORIZED).json({
            message: 'Authorization failed'
        })
    }

}

export default {
    getAllEventPlayer,
    joinGame,
    getDetailEventPlayer
}