import express from 'express'
import { login, register } from './controller/User'
import { createRanking, getRankingByUser, getRankingByRankingId } from './controller/Ranking'

const noAuthRouter = express.Router()
const authRouter = express.Router()

noAuthRouter.post('/login', login)
noAuthRouter.post('/register', register)
noAuthRouter.get('/ranking/:rankingId', getRankingByRankingId)

authRouter.post('/ranking', createRanking)
authRouter.get('/user/ranking', getRankingByUser)

export { noAuthRouter, authRouter }
