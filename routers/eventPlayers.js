import express from 'express'
import { eventPlayerController } from '../controllers/index.js'

const router = express.Router()

// get all event player by PLyerId
router.get('/', eventPlayerController.getAllEventPlayer)

router.get('/getDetailEventPlayer', eventPlayerController.getDetailEventPlayer)

router.post('/joingame', eventPlayerController.joinGame)


export default router