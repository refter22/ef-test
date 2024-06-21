import config from '../config/config.js'
import { getChannel } from '../config/rabbitmq.js'
import usersRep from '../repositories/users.repository.js'

const sendMessageToRabbitMQ = (message) => {
  const channel = getChannel()
  channel.assertQueue(config.rabbitmq.queue, { durable: true })
  channel.sendToQueue(
    config.rabbitmq.queue,
    Buffer.from(JSON.stringify(message))
  )
  console.log(
    `Сообщение отправлено в очередь ${config.rabbitmq.queue}:`,
    message
  )
}

export async function getUsersList(req, res) {
  try {
    const users = await usersRep.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
}

export async function createUser(req, res) {
  try {
    const { firstName, lastName, email, age } = req.body
    const user = await usersRep.createUser(email, firstName, lastName, age)
    sendMessageToRabbitMQ({
      event: 'user_created',
      user_id: user.id,
      data: user,
      timestamp: Date.now()
    })

    res.status(201).json()
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
}

export async function updateUser(req, res) {
  try {
    const { id, firstName, lastName, email, age } = req.body
    const { oldUser, newUser } = await usersRep.updateUser(
      id,
      firstName,
      lastName,
      email,
      age
    )
    sendMessageToRabbitMQ({
      event: 'user_updated',
      user_id: id,
      oldData: oldUser,
      newData: newUser,
      timestamp: Date.now()
    })

    res.status(200).json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
}
