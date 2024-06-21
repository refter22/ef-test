"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
const user_changes_service_1 = require("./user-changes/user-changes.service");
const user_changes_controller_1 = require("./user-changes/user-changes.controller");
const postgres_module_1 = require("./postgres/postgres.module");
const user_changes_entity_1 = require("./user-changes/user-changes.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [postgres_module_1.PostgresModule, typeorm_1.TypeOrmModule.forFeature([user_changes_entity_1.UserChanges])],
        controllers: [app_controller_1.AppController, user_changes_controller_1.UserChangesController],
        providers: [rabbitmq_service_1.RabbitMQService, user_changes_service_1.UserChangesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map