import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { UserChanges } from '../user-changes/user-changes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: [UserChanges],
    }),
    TypeOrmModule.forFeature([UserChanges]),
  ],
})
export class PostgresModule {}
