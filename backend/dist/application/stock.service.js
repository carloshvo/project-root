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
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../infrastructure/prisma.service");
let StockService = class StockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async entrada(materialId, quantidade, usuarioId) {
        const material = await this.prisma.material.findUnique({ where: { id: materialId } });
        if (!material)
            throw new Error('Material não encontrado');
        const atualizado = await this.prisma.material.update({
            where: { id: materialId },
            data: { quantidade_estoque: material.quantidade_estoque + quantidade },
        });
        await this.prisma.stockMovement.create({
            data: { tipo: 'entrada', quantidade, materialId, usuarioId },
        });
        return atualizado;
    }
    async saida(materialId, quantidade, usuarioId) {
        const material = await this.prisma.material.findUnique({ where: { id: materialId } });
        if (!material)
            throw new Error('Material não encontrado');
        if (material.quantidade_estoque - quantidade < 0)
            throw new Error('Estoque insuficiente');
        const atualizado = await this.prisma.material.update({
            where: { id: materialId },
            data: { quantidade_estoque: material.quantidade_estoque - quantidade },
        });
        await this.prisma.stockMovement.create({
            data: { tipo: 'saida', quantidade, materialId, usuarioId },
        });
        return atualizado;
    }
    async historico() {
        return this.prisma.stockMovement.findMany({ orderBy: { data_movimentacao: 'desc' } });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockService);
//# sourceMappingURL=stock.service.js.map