import express from 'express'

import usersRouter from './routes/users.route.js'
import useSawagger from './swagger.js'

const app = express()

app.use(express.json())
app.use('/users', usersRouter)

useSawagger(app)

export default app
