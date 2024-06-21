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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChangesController = void 0;
const common_1 = require("@nestjs/common");
const user_changes_service_1 = require("./user-changes.service");
let UserChangesController = class UserChangesController {
    constructor(userChangesService) {
        this.userChangesService = userChangesService;
    }
    async getUserChanges(userId, page = 1, limit = 10) {
        return this.userChangesService.getUserChanges(userId, page, limit);
    }
};
exports.UserChangesController = UserChangesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], UserChangesController.prototype, "getUserChanges", null);
exports.UserChangesController = UserChangesController = __decorate([
    (0, common_1.Controller)('user-changes'),
    __metadata("design:paramtypes", [user_changes_service_1.UserChangesService])
], UserChangesController);
//# sourceMappingURL=user-changes.controller.js.map