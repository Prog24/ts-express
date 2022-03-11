import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User as UserModel } from 'src/entities/User'

declare module 'express-session' {
  interface SessionData {
    token: string
  }
}

const register = async (req: express.Request, res: express.Response) => {
  const email = req.body.email
  const password = req.body.password
  const user = new UserModel()
  const hash_password: string = await bcrypt.hash(password, 10)
  user.email = email
  user.password = hash_password
  user.save().then(success => {
    res.send(success)
  }).catch(err => {
    res.send({'error': err.message})
  })
}

const login = async (req: express.Request, res: express.Response) => {
  const email = req.body.email
  const password = req.body.password
  await UserModel.findOne({ email: email }).then(success => {
    if (bcrypt.compareSync(password, success!.password)) {
      const token = jwt.sign({ email: email, id: success?.id }, 'my_secret', { expiresIn: '1h' })
      req.session.token = token
      res.send({ 'sessionID': req.sessionID, 'csrfToken': req.csrfToken() })
    } else {
      res.send({ 'error': 'no match' })
    }
  }).catch(err => {
    res.send({ error: err.message })
  })
}

const logout = async (req: express.Request, res: express.Response) => {
  req.session.destroy((err) => {
    res.send({'message':'logout'})
  })
}

const me = async (req: express.Request, res: express.Response) => {
  const jwtToken = req.session.token
  if (jwtToken === undefined) {
    res.status(403).send({'message':'403 Forbidden'})
  } else {
    try {
      const token = jwt.verify(jwtToken, 'my_secret') as any
      await UserModel.createQueryBuilder('user').where({ id: token.id }).select(['user.id', 'user.email', 'user.created_at']).getOne().then(userInfo => {
        res.send(userInfo)
      }).catch(err => {
        res.status(500).send({'message': err.message})
      })
    } catch (err: any) {
      res.status(500).send({'message': err.message})
    }
  }
}

const csrfRequest = async (req: express.Request, res: express.Response) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  res.send({'csrf': req.csrfToken()})
}

export { login, register, logout, me, csrfRequest }