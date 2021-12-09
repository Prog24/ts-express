import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User as UserModel } from 'src/entities/User'

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
      const token = jwt.sign({ email: email }, 'my_secret', { expiresIn: '1h' })
      res.send({ token: token })
    } else {
      res.send({ 'error': 'no match' })
    }
  }).catch(err => {
    res.send({ error: err.message })
  })
}

export { login, register }