import express from 'express'
import jwt from 'jsonwebtoken'
import { noAuthRouter, authRouter } from 'src/router'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import session from 'express-session'

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
  // const authHeader = req.headers["authorization"]
  // // HeaderにAuthorizationが定義されているか
  // if (authHeader !== undefined) {
  //   // Bearerが正しく定義されているか
  //   if (authHeader.split(" ")[0] === "Bearer") {
  //     try {
  //       const token = jwt.verify(authHeader.split(" ")[1], 'my_secret') as any
  //       if (Date.now() < token.exp * 1000) {
  //         console.log(token)
  //         res.locals.jwtPayload = token
  //         next()
  //       } else {
  //         res.status(403).json({ error: 'auth error' })
  //       }
  //     } catch (e: any) {
  //       console.log(e.message)
  //       res.status(403).json({ error: e.message })
  //     }
  //   } else {
  //     res.status(403).json({ error: 'header format error' })
  //   }
  // } else {
  //   res.status(403).json({ error: 'handler error' })
  // }
}

const app = async () => {
  const app: express.Express = express()
  const connectionOptions = await getConnectionOptions()
  const connection = await createConnection(connectionOptions)
  BaseEntity.useConnection(connection)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // httpsの場合はtrue
      maxAge: 1000 * 60 * 60 // 60min
    }
  }))
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
