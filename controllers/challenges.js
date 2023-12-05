import { body } from 'express-validator'
import StatusCode from '../exceptions/StatusCode.js'

import { MAX_RECORDS } from '../global/constants.js'
import _ from "underscore";
import { ObjectId } from 'mongodb';

async function getALlChallenges(req, res) {
    let { page = 1, size = MAX_RECORDS, searchString = '', status = 1 } = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let filteredChallenges = await challengeRepository.getALlChallenges({
            size, page, searchString, status
        })
        res.status(StatusCode.OK).json({
            message: 'Đã tìm thấy thử thách',
            page,
            searchString,
            size: filteredChallenges.length,
            status,
            data: filteredChallenges
        })
    } catch (exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

async function getDetailChallenge(req, res) {
    let challengeId = req.params.id
    try {
        const challenge = await challengeRepository.getDetailChallenge(challengeId)
        if (challenge) {
            res.status(StatusCode.OK).json({
                message: 'Đã tìm thấy thử thách',
                data: challenge,
            })
        } else {
            res.status(StatusCode.NOT_FOUND).json({
                message: 'Thử thách đéo tồn tại'
            })
        }
    } catch (exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

// Update Challenge
async function updateChallenge(req, res) {
    try {
        const challenge = await challengeRepository.updateChallenge(req.body)
        console.log(challenge)
        if (challenge) {
            res.status(StatusCode.OK).json({
                message: 'Đã cập nhật thử thách thành công',
                data: challenge
            })
        } else {
            res.status(StatusCode.BAD_REQUEST).json({
                message: 'Thử thách đéo tồn tại'
            })
        }
    } catch (exception) {
        console.log(exception)
    }
}

// Tạo challenge
async function insertChallenge(req, res) {
    try {
        const challenge = await challengeRepository.insertChallenge(req.body)
        res.status(StatusCode.INSERT_OK).json({
            message: 'Tạo thử thách thành công!',
            data: challenge
        })
    } catch (exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Không thể tạo thử thách:' + exception
        })
    }
}

// Tham gia challenge
async function joinChallenge(req, res) {
    try {
        const join = await challengeRepository.joinChallenge(req.body)
        if (join) {
            const update = await challengeRepository.updateStatusChallenge(req.body.challengeId)
            res.status(StatusCode.INSERT_OK).json({
                message: 'Tham gia thử thách thành công!',
                data: update
            })
        } else {
            res.status(StatusCode.BAD_REQUEST).json({
                message: 'Tham gia thử thách không thành công!'
            });
        }
    } catch (exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Không thể tham gia thử thách: ' + exception
        })
        console.log(exception)
    }
}

export default {
    getALlChallenges,
    updateChallenge,
    insertChallenge,
    getDetailChallenge,
    joinChallenge
}