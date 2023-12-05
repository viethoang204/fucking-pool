import express from 'express'
import {body, validationResult} from 'express-validator'
import { userController } from '../controllers/index.js'

const router = express.Router()

// GET all users
router.get('/', userController.getAllUsers)
/**
 * @openapi
 * '/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get all User
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: ObjectId
 *                  name:
 *                    type: string
 *                  level:
 *                    type: integer
 *                  exp:
 *                    type: integer
 *                  stamina:
 *                    type: integer
 *                  gold:
 *                    type: integer
 *                  phone:
 *                    type: string
 *                  avatar:
 *                    type: string
 *       400:
 *         description: Bad request
 */

// Lấy chi tiết user
router.get('/:id', userController.getDetailUser)

// Thêm người dùng mới
router.post('/', userController.insertUser)

// Thêm người dùng mới
router.post('/updateUser', userController.updateUser)

// router.get('/:id', userController.getDetailUser)


export default router