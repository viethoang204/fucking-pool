import express from 'express'
import { challengeController } from '../controllers/index.js'

const router = express.Router()

// get all challenges
router.get('/', challengeController.getALlChallenges)

// get details challenge by id
router.get('/:id', challengeController.getDetailChallenge)

// post challenges
router.post('/insertChallenge', challengeController.insertChallenge)

// join challenge
router.post('/joinChallenge', challengeController.joinChallenge)

// update challenge
router.post('/updateChallenge', challengeController.updateChallenge)

/**
 * @openapi
 * '/challenges':
 *  get:
 *     tags:
 *     - Challenge
 *     summary: Get all challenges
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
 *                    type: object
 *                  name:
 *                    type: string
 *                  detail:
 *                    type: string
 *                  opt1:
 *                    type: string
 *                  opt2:
 *                    type: string
 *                  startDate:
 *                    type: date-time
 *                  endDate:
 *                    type: string
 *                    format: date-time
 *                  handicap:
 *                    type: number
 *                  limitGold:
 *                    type: boolean
 *                  minGold:
 *                    type: integer
 *                  maxGold:
 *                    type: integer
 *                  creatorId:
 *                    type: objectid
 *       400:
 *         description: Bad request
 */

export default router