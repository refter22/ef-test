import express from 'express'

import usersRouter from './routes/users.route.js'

const app = express()

app.use(express.json())
app.use('/users', usersRouter)

export default app
