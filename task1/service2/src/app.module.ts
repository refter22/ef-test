import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { UserChangesService } from './user-changes/user-changes.service';
import { UserChangesController } from './user-changes/user-changes.controller';
import { PostgresModule } from './postgres/postgres.module';
import { UserChanges } from './user-changes/user-changes.entity';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([UserChanges])],
  controllers: [AppController, UserChangesController],
  providers: [RabbitMQService, UserChangesService],
})
export class AppModule {}
