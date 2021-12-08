import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User as UserModel } from 'src/entities/User'

type User = {
  id: number,
  name: string,
  email: string
}

const users: User[] = [
  { id: 2, name: "User1", email: "user1@example.com" },
  { id: 2, name: "User2", email: "user2@example.com" },
  { id: 3, name: "User3", email: "user3@example.com" }
]

const getUsers = (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users))
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
      const token = jwt.sign({ email: email }, 'my_secret', { expiresIn: '1h' })
      res.send({ token: token })
    } else {
      res.send({ 'error': 'no match' })
    }
  }).catch(err => {
    res.send({ error: err.message })
  })
}

export { getUsers, login, register }