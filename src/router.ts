import express from 'express'
import { login, register, logout } from './controller/User'
import { createRanking, getAllRanking, getRankingByUser, getRankingByRankingId, deleteRankingById } from './controller/Ranking'

const noAuthRouter = express.Router()
const authRouter = express.Router()

noAuthRouter.post('/login', login)
noAuthRouter.post('/register', register)
noAuthRouter.get('/ranking', getAllRanking)
noAuthRouter.get('/ranking/:rankingId', getRankingByRankingId)

authRouter.post('/logout', logout)
authRouter.post('/ranking', createRanking)
authRouter.get('/user/ranking', getRankingByUser)
authRouter.delete('/ranking/:rankingId', deleteRankingById)

export { noAuthRouter, authRouter }
