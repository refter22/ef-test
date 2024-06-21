import { DataSource, Table } from 'typeorm'
import config from '../config/config.js'
import pg from 'pg'
const { Client } = pg

async function ensureDatabaseExists() {
  const client = new Client({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password
  })
  try {
    await client.connect()
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.db.database}'`
    )
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${config.db.database}"`)
      console.log(`База данных "${config.db.database}" создана успешно.`)
    } else {
      console.log(`База данных "${config.db.database}" уже существует.`)
    }
  } catch (err) {
    console.error('Произошла ошибка при проверке/создании базы данных:', err)
  } finally {
    await client.end()
  }
}

async function ensureUsersTableExists(queryRunner) {
  const hasTable = await queryRunner.hasTable('users')
  if (!hasTable) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'first_name',
            type: 'varchar'
          },
          {
            name: 'last_name',
            type: 'varchar'
          },
          {
            name: 'age',
            type: 'int'
          }
        ]
      })
    )
    console.log('Таблица "users" создана успешно.')
  } else {
    console.log('Таблица "users" уже существует.')
  }
}

async function initialize() {
  await ensureDatabaseExists()

  const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    synchronize: false
  })

  await AppDataSource.initialize()

  const queryRunner = AppDataSource.createQueryRunner()
  await ensureUsersTableExists(queryRunner)

  await queryRunner.release()
  await AppDataSource.destroy()
}

initialize().catch((error) =>
  console.error(
    'Произошла ошибка при инициализации и заполнении базы данных',
    error
  )
)
