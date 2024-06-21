export declare class RabbitMQService {
    private connection;
    private channel;
    start(): Promise<void>;
    consume(callback: (msg: any) => void): Promise<void>;
}
