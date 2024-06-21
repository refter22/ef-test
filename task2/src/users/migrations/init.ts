import { DataSource, QueryRunner, Table } from 'typeorm';
import { User } from '../user.entity';
import { seedUsers } from './seed';
import { config } from '../../config/config';
import { Client } from 'pg';

async function ensureDatabaseExists() {
  const client = new Client({
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.database.database}'`,
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${config.database.database}"`);
      console.log(`База данных "${config.database.database}" создана успешно.`);
    } else {
      console.log(`База данных "${config.database.database}" уже существует.`);
    }
  } catch (err) {
    console.error('Произошла ошибка при проверке/создании базы данных:', err);
  } finally {
    await client.end();
  }
}

async function ensureUsersTableExists(queryRunner: QueryRunner) {
  const hasTable = await queryRunner.hasTable('user');
  if (!hasTable) {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female'],
          },
          {
            name: 'hasProblems',
            type: 'boolean',
            default: false,
          },
        ],
        indices: [
          {
            columnNames: ['hasProblems'],
          },
        ],
      }),
    );
    console.log('Таблица "user" создана успешно.');
  } else {
    console.log('Таблица "user" уже существует.');
  }
}

async function initializeAndSeed() {
  await ensureDatabaseExists();

  const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [User],
    synchronize: false,
  });

  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await ensureUsersTableExists(queryRunner);

  console.log('Заполнение базы данных...');
  await seedUsers(AppDataSource);
  console.log('Заполнение базы данных завершено');

  await queryRunner.release();
  await AppDataSource.destroy();
}

initializeAndSeed().catch((error) =>
  console.error(
    'Произошла ошибка при инициализации и заполнении базы данных',
    error,
  ),
);
