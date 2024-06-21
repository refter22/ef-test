"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_changes_entity_1 = require("../user-changes/user-changes.entity");
const config_1 = require("../config");
const pg_1 = require("pg");
async function ensureDatabaseExists() {
    const client = new pg_1.Client({
        host: config_1.config.database.host,
        port: config_1.config.database.port,
        user: config_1.config.database.username,
        password: config_1.config.database.password,
    });
    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${config_1.config.database.database}'`);
        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE "${config_1.config.database.database}"`);
            console.log(`База данных "${config_1.config.database.database}" создана успешно.`);
        }
        else {
            console.log(`База данных "${config_1.config.database.database}" уже существует.`);
        }
    }
    catch (err) {
        console.error('Произошла ошибка при проверке/создании базы данных:', err);
    }
    finally {
        await client.end();
    }
}
async function ensureUserChangesTableExists(queryRunner) {
    const hasTable = await queryRunner.hasTable('user_changes');
    if (!hasTable) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        console.log('Таблица "user_changes" создана успешно.');
    }
    else {
        console.log('Таблица "user_changes" уже существует.');
    }
}
async function initialize() {
    await ensureDatabaseExists();
    const AppDataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: config_1.config.database.host,
        port: config_1.config.database.port,
        username: config_1.config.database.username,
        password: config_1.config.database.password,
        database: config_1.config.database.database,
        entities: [user_changes_entity_1.UserChanges],
        synchronize: false,
    });
    await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();
    await ensureUserChangesTableExists(queryRunner);
    await queryRunner.release();
    await AppDataSource.destroy();
}
initialize().catch((error) => console.error('Произошла ошибка при инициализации и заполнении базы данных', error));
//# sourceMappingURL=init.js.map