import { body } from 'express-validator'
import StatusCode from '../exceptions/StatusCode.js'
import { userRepository } from '../respositories/index.js'
import { MAX_RECORDS } from '../global/constants.js'

// Lấy tất cả thông tin người dùng
async function getAllUsers(req, res) {
    let {page = 1 ,size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let filteredUsers = await userRepository.getAllUsers({
            size, page, searchString
        })
        res.status(StatusCode.OK).json({
            message: 'Đã tìm thấy người dùng',
            page,
            searchString,
            size: filteredUsers.length,
            data: filteredUsers
        })
    } catch (exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
}

// lấy thông tin chi tiết người dùng
async function getDetailUser(req,res) {
    let userId = req.query
    try {
        const user = await userRepository.getDetailUser({userId})
        if (!user) {
            res.status(StatusCode.NOT_FOUND).json({
                message: 'Id không tồn tại',
                code: 404
            })
        } else {
            res.status(StatusCode.OK).json({
                message: 'Thành công',
                code: 200,
                data: user
            })
        }
    } catch (exception) {
        console.log(exception)
    }
}

// Tạo thêm người dùng
async function insertUser(req, res) {
    try {
        const user = await userRepository.insertUser(req.body)
        res.status(StatusCode.INSERT_OK).json({
            message: 'Tạo mới người dùng thành công!',
            data: user
        })
    } catch(exception) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Không thể tạo người dùng:' + exception
        })
    }
}

async function updateUser(req, res) {
    try {
        const user = await userRepository.updateUser(req.body)
        if (user) {
            res.status(StatusCode.OK).json({
                message: 'Cập nhật thông tin người dùng thành công!',
                data: user
            })
        } else {
            res.status(StatusCode.NOT_FOUND).json({
                message: 'User không tồn tại',
            })
        }
    } catch (exception) {
        console.log(exception)
    }
}

export default {
    getAllUsers,
    getDetailUser,
    insertUser,
    updateUser
}