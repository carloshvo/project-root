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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const stock_service_1 = require("./stock.service");
const stock_dto_1 = require("./dto/stock.dto");
let StockController = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    async findAllMovements() {
        return this.stockService.findAllMovements();
    }
    async createMovement(data) {
        return this.stockService.createMovement(data);
    }
    async updateMovement(id, data) {
        const movementId = Number(id);
        if (isNaN(movementId)) {
            throw new common_1.BadRequestException('ID deve ser um número válido');
        }
        return this.stockService.updateMovement(movementId, data);
    }
    async removeMovement(id) {
        const movementId = Number(id);
        if (isNaN(movementId)) {
            throw new common_1.BadRequestException('ID deve ser um número válido');
        }
        return this.stockService.removeMovement(movementId);
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Get)('movements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockController.prototype, "findAllMovements", null);
__decorate([
    (0, common_1.Post)('movements'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stock_dto_1.CreateMovementDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "createMovement", null);
__decorate([
    (0, common_1.Put)('movements/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stock_dto_1.UpdateMovementDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "updateMovement", null);
__decorate([
    (0, common_1.Delete)('movements/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "removeMovement", null);
exports.StockController = StockController = __decorate([
    (0, common_1.Controller)('api/stock'),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map