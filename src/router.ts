import express from 'express'
import { login, register, logout, csrfRequest } from './controller/User'
import { createRanking, getAllRanking, getRankingByUser, getRankingByRankingId, deleteRankingById } from './controller/Ranking'
import csrf from 'csurf'

const noAuthRouter = express.Router()
const authRouter = express.Router()
const csrfProtect = csrf({ cookie: true })

noAuthRouter.get('/csrf', csrfRequest)
noAuthRouter.post('/login', login)
noAuthRouter.post('/register', register)
noAuthRouter.get('/ranking', getAllRanking)
noAuthRouter.get('/ranking/:rankingId', getRankingByRankingId)

authRouter.post('/logout', logout)
authRouter.post('/ranking', createRanking)
authRouter.get('/user/ranking', csrfProtect, getRankingByUser)
authRouter.delete('/ranking/:rankingId', deleteRankingById)

export { noAuthRouter, authRouter }
