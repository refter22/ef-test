import { DataSource, QueryRunner, Table } from 'typeorm';
import { UserChanges } from '../user-changes/user-changes.entity';
import { config } from '../config';
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

async function ensureUserChangesTableExists(queryRunner: QueryRunner) {
  const hasTable = await queryRunner.hasTable('user_changes');
  if (!hasTable) {
    await queryRunner.createTable(
      new Table({
        name: 'user_changes',
        columns: [
          {
            name: 'userChangesId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'event',
            type: 'varchar',
          },
          {
            name: 'oldData',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'newData',
            type: 'jsonb',
          },
          {
            name: 'timestamp',
            type: 'timestamp',
          },
        ],
      }),
    );
    console.log('Таблица "user_changes" создана успешно.');
  } else {
    console.log('Таблица "user_changes" уже существует.');
  }
}

async function initialize() {
  await ensureDatabaseExists();

  const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [UserChanges],
    synchronize: false,
  });

  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await ensureUserChangesTableExists(queryRunner);

  await queryRunner.release();
  await AppDataSource.destroy();
}

initialize().catch((error) =>
  console.error(
    'Произошла ошибка при инициализации и заполнении базы данных',
    error,
  ),
);
