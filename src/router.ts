import express from 'express'
import { getUsers, login, register } from './controller/User'
import { sample } from './controller/Ranking'

const noAuthRouter = express.Router()
const authRouter = express.Router()

noAuthRouter.post('/login', login)
noAuthRouter.post('/register', register)

authRouter.get('/users', getUsers)
authRouter.post('/ranking', sample)

export { noAuthRouter, authRouter }
