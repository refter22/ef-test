"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
const user_changes_service_1 = require("./user-changes/user-changes.service");
const user_changes_entity_1 = require("./user-changes/user-changes.entity");
let AppController = class AppController {
    constructor(rabbitMQService, userChangesService) {
        this.rabbitMQService = rabbitMQService;
        this.userChangesService = userChangesService;
        this.setupRabbitMQ();
    }
    async setupRabbitMQ() {
        await this.rabbitMQService.start();
        this.rabbitMQService.consume(this.handleMessage.bind(this));
    }
    async handleMessage(message) {
        const { event, user_id, data, oldData, newData, timestamp } = message;
        const userChange = new user_changes_entity_1.UserChanges();
        userChange.userId = user_id;
        userChange.event = event;
        userChange.oldData = oldData || null;
        userChange.newData = data || newData || null;
        userChange.timestamp = new Date(timestamp);
        try {
            await this.userChangesService.createUserChange(userChange);
            console.log(`Событие изменения пользователя ${event} для пользователя ${user_id} успешно обработано.`);
        }
        catch (error) {
            console.error(`Ошибка обработки события изменения пользователя ${event} для пользователя ${user_id}: ${error.message}`);
        }
    }
};
exports.AppController = AppController;
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [rabbitmq_service_1.RabbitMQService,
        user_changes_service_1.UserChangesService])
], AppController);
//# sourceMappingURL=app.controller.js.map