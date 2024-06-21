import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { UserChangesService } from './user-changes/user-changes.service';
export declare class AppController {
    private readonly rabbitMQService;
    private readonly userChangesService;
    constructor(rabbitMQService: RabbitMQService, userChangesService: UserChangesService);
    setupRabbitMQ(): Promise<void>;
    handleMessage(message: any): Promise<void>;
}
