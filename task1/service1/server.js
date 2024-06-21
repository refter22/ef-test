import app from './app.js'
import config from './config/config.js'
import { connectRabbitMQ } from './config/rabbitmq.js'

const port = config.port

app.listen(port, async () => {
  await connectRabbitMQ()
  console.log(`Server running on port ${port}`)
})
