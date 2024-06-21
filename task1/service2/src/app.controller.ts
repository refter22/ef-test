import { Controller } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { UserChangesService } from './user-changes/user-changes.service';
import { UserChanges } from './user-changes/user-changes.entity';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly userChangesService: UserChangesService,
  ) {
    this.setupRabbitMQ();
  }

  async setupRabbitMQ() {
    await this.rabbitMQService.start();
    this.rabbitMQService.consume(this.handleMessage.bind(this));
  }

  async handleMessage(message: any) {
    const { event, user_id, data, oldData, newData, timestamp } = message;

    const userChange = new UserChanges();
    userChange.userId = user_id;
    userChange.event = event;
    userChange.oldData = oldData || null;
    userChange.newData = data || newData || null;
    userChange.timestamp = new Date(timestamp);

    try {
      await this.userChangesService.createUserChange(userChange);
      console.log(
        `Событие изменения пользователя ${event} для пользователя ${user_id} успешно обработано.`,
      );
    } catch (error) {
      console.error(
        `Ошибка обработки события изменения пользователя ${event} для пользователя ${user_id}: ${error.message}`,
      );
    }
  }
}
