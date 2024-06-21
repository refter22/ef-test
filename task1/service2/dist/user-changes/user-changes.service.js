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
exports.UserChangesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_changes_entity_1 = require("./user-changes.entity");
let UserChangesService = class UserChangesService {
    constructor(userChangesRepository) {
        this.userChangesRepository = userChangesRepository;
    }
    async createUserChange(userChange) {
        return await this.userChangesRepository.save(userChange);
    }
    async getUserChanges(userId, page = 1, limit = 10) {
        const [results, total] = await this.userChangesRepository.findAndCount({
            where: { userId },
            order: { timestamp: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            data: results,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
};
exports.UserChangesService = UserChangesService;
exports.UserChangesService = UserChangesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_changes_entity_1.UserChanges)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserChangesService);
//# sourceMappingURL=user-changes.service.js.map