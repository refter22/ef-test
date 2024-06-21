import amqp from 'amqplib'
import dotenv from 'dotenv'
import config from './config.js'

dotenv.config()

let channel = null

const connectRabbitMQ = async () => {
  try {
    console.log('Попытка соединения с RabbitMQ...')
    const connection = await amqp.connect(config.rabbitmq.url)
    channel = await connection.createChannel()
    console.log('Успешное соединение с RabbitMQ')
  } catch (error) {
    console.error('Ошибка соединения с RabbitMQ:', error)
  }
}

const getChannel = () => {
  if (!channel) {
    throw new Error('Канал RabbitMQ не инициализирован')
  }
  return channel
}

export { connectRabbitMQ, getChannel }
