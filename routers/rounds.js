import express from 'express'
import { roundController } from '../controllers/index.js'
// import {authenticateJWT} from '../global/middleware.js'


const router = express.Router()


//get all round
router.get('/', roundController.getAllRound)

//get details round
router.get('/getDetailRound', roundController.getDetailRound)

export default router