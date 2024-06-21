import { Injectable } from '@nestjs/common';
import { Channel, Connection, connect } from 'amqplib';
import { config } from '../config';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async start() {
    this.connection = await connect(config.rabbitmq.url);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(config.rabbitmq.queue, { durable: true });
  }

  async consume(callback: (msg: any) => void) {
    await this.channel.consume(
      'users_changes',
      (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content.toString());
          callback(message);
        }
      },
      { noAck: true },
    );
  }
}
