"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ValidationService = class ValidationService {
    async validateDto(dtoClass, plainObject) {
        const instance = (0, class_transformer_1.plainToInstance)(dtoClass, plainObject);
        const errors = await (0, class_validator_1.validate)(instance);
        if (errors.length > 0) {
            const messages = errors.map(error => this.formatError(error)).flat();
            throw new common_1.BadRequestException({
                message: 'Erro de validação',
                errors: messages,
            });
        }
    }
    formatError(error) {
        const messages = [];
        if (error.constraints) {
            messages.push(...Object.values(error.constraints));
        }
        if (error.children && error.children.length > 0) {
            messages.push(...error.children.map(child => this.formatError(child)).flat());
        }
        return messages;
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map