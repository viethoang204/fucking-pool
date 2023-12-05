import express from 'express'
import {body, validationResult} from 'express-validator'
import { fakerController } from '../controllers/index.js'

const router = express.Router()

// Generate FAKE users
router.post('/generateFakeUsers', fakerController.generateFakeUsers)

// post fake challenges
router.post('/generateFakeChallenges', fakerController.generateFakeChallenges)

// post fake user challenges
router.post('/generateFakeUserChallenge', fakerController.generateFakeUserChallenge)

export default router