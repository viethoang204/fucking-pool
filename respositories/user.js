import { Challenge, User } from "../models/index.js"
import { faker } from '@faker-js/faker'
import { print } from "../helpers/print.js"
import StatusCode from "../exceptions/StatusCode.js"
import mongoose from 'mongoose';

// List tất cả các User
const getAllUsers = async ({
    page,
    size,
    searchString,
}) => {
    page = parseInt(page)
    size = parseInt(size)
    //aggregate data for all Users
    let filteredUsers = await User.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
                    },
                    {
                        phone: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
                    },
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size },
    ])
    return filteredUsers
}

// lấy thông tin chi tiết người dùng
const getDetailUser = async ({
    userId,
}) => {
    try {
        const user = await User.findOne({
            userId
        })
        return user
    } catch (exception) {
        console.log(exception)
    }
}

// Tạo thêm user
const insertUser = async ({
    name,
    phone,
    avatar
}) => {
    try {
        const newUser = await User.create({
            _id: new mongoose.Types.ObjectId,
            name,
            phone,
            avatar
        })
        print(newUser)
        return newUser
    } catch (exception) {
        console.log(exception)
    }
}

const updateUser = async ({
    userId,
    name,
    phone,
    avatar
}) => {
    try {
        //thay đổi thông tin người dùng
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                "$set": {
                    "name": name || undefined,
                    "phone": phone || undefined,
                    "avatar": avatar || undefined
                }
            }
        )
        const user = await User.findById(userId)

        // update lại thông tin người với vai trò là creator trong challenge và với vai trò là player trong challenge    
        const updateCreator = await Challenge.updateMany(
            { "creator.id": userId },
            {
                "$set": {
                    "creator.name": name || undefined,
                    "creator.avatar": avatar || undefined,
                }
            }
        )
        const updatePlayer = await Challenge.updateMany(
            {
                "listPlayers._id": userId
            },
            {
                "$set": {
                    "listPlayers.$.name": name || undefined,
                    "listPlayers.$.avatar": avatar || undefined,
                }
            }
        )
        console.log(updatePlayer)
        return user
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