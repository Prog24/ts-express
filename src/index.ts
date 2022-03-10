import express from 'express'
import jwt from 'jsonwebtoken'
import { noAuthRouter, authRouter } from 'src/router'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { createClient } from 'redis'
import connectRedis from 'connect-redis'
import csrf from 'csurf'

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const jwtToken = req.session.token
  if (jwtToken === undefined) {
    res.status(403).send({'message':'403 Forbidden'})
  } else {
    try {
      const token = jwt.verify(jwtToken, 'my_secret') as any
      if (Date.now() < token.exp * 1000) {
        res.locals.jwtPayload = token
        next()
      } else {
        res.status(403).send({'message':'403 Forbidden'})
      }
    } catch (e: any) {
      res.status(403).send({'message':'403 Forbidden'})
    }
  }
}

const app = async () => {
  const app: express.Express = express()
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)
  const RedisStore = connectRedis(session)
  const redisClient = createClient({
    url: "redis://redis:6379",
  })


  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient as any, disableTouch: true }),
    cookie: {
      httpOnly: true,
      secure: false, // httpsの場合はtrue
      maxAge: 1000 * 60 * 60 // 60min
    }
  }))
  app.use(csrf({ cookie: false }))
  // CROS(Need fix)
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
  })
  
  app.use('/', noAuthRouter)
  app.use('/', verifyToken, authRouter)
  app.listen(3000, () => {
    console.log("Start on port 3000.")
  })
}

app()
