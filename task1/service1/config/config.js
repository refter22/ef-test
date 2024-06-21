import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const schema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
  RABBITMQ_QUEUE: Joi.string().required()
}).unknown(true)

const { error, value: envVars } = schema.validate(process.env)

if (error) {
  throw new Error(`Ошибка валидации конфигурации: ${error.message}`)
}

const config = {
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE
  },
  rabbitmq: {
    url: envVars.RABBITMQ_URL,
    queue: envVars.RABBITMQ_QUEUE
  }
}

export default config
