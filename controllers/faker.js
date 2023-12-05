import { fakerRepository } from '../respositories/index.js'
import StatusCode from '../exceptions/StatusCode.js'

async function generateFakeUsers(req, res) {
    await fakerRepository.generateFakeUsers(req.body)
    res.status(StatusCode.INSERT_OK).json({
        message: 'Tạo 100 users fake thành công!',
    })
}

async function generateFakeChallenges(req, res) {
    await fakerRepository.generateFakeChallenges(req.body)
    res.status(StatusCode.INSERT_OK).json({
        message: 'Tạo thử thách fake thành công!',
    })
}

async function generateFakeUserChallenge(req, res) {
    await fakerRepository.generateFakeUserChallenge(req.body)
    res.status(StatusCode.INSERT_OK).json({
        message: 'Tạo thử thách fake thành công!',
    })
}

export default {
    generateFakeUsers,
    generateFakeChallenges,
    generateFakeUserChallenge
}