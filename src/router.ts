import express from 'express'
import { login, register } from './controller/User'
import { sample } from './controller/Ranking'

const noAuthRouter = express.Router()
const authRouter = express.Router()

noAuthRouter.post('/login', login)
noAuthRouter.post('/register', register)

authRouter.post('/ranking', sample)

export { noAuthRouter, authRouter }
