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
const prisma_service_1 = require("../shared/prisma.service");
let StockService = class StockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllMovements() {
        return this.prisma.stockMovement.findMany({
            include: {
                material: { select: { id: true, nome: true, unidade_medida: true, quantidade_estoque: true } },
                usuario: { select: { id: true, nome: true, email: true } },
            },
            orderBy: { data_movimentacao: 'desc' },
        });
    }
    async createMovement(data) {
        if (data.quantidade <= 0) {
            throw new common_1.BadRequestException('Quantidade deve ser maior que zero');
        }
        const material = await this.prisma.material.findUnique({ where: { id: data.materialId } });
        if (!material) {
            throw new common_1.NotFoundException(`Material com ID ${data.materialId} não encontrado`);
        }
        if (data.usuarioId) {
            const usuario = await this.prisma.user.findUnique({ where: { id: data.usuarioId } });
            if (!usuario) {
                throw new common_1.NotFoundException(`Usuário com ID ${data.usuarioId} não encontrado`);
            }
        }
        let novaQuantidade = material.quantidade_estoque;
        if (data.tipo === 'entrada') {
            novaQuantidade += data.quantidade;
        }
        else {
            if (novaQuantidade - data.quantidade < 0) {
                throw new common_1.BadRequestException(`Estoque insuficiente. Disponível: ${material.quantidade_estoque}, Solicitado: ${data.quantidade}`);
            }
            novaQuantidade -= data.quantidade;
        }
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.material.update({
                where: { id: data.materialId },
                data: { quantidade_estoque: novaQuantidade },
            });
            return tx.stockMovement.create({
                data: {
                    materialId: data.materialId,
                    usuarioId: data.usuarioId,
                    tipo: data.tipo,
                    quantidade: data.quantidade,
                    data_movimentacao: new Date(),
                },
                include: {
                    material: { select: { id: true, nome: true, unidade_medida: true, quantidade_estoque: true } },
                    usuario: { select: { id: true, nome: true, email: true } },
                },
            });
        });
        return result;
    }
    async updateMovement(id, data) {
        var _a;
        const movimentoExistente = await this.prisma.stockMovement.findUnique({ where: { id } });
        if (!movimentoExistente) {
            throw new common_1.NotFoundException(`Movimentação com ID ${id} não encontrada`);
        }
        const material = await this.prisma.material.findUnique({ where: { id: movimentoExistente.materialId } });
        if (!material) {
            throw new common_1.NotFoundException(`Material associado à movimentação não encontrado`);
        }
        if (data.quantidade !== undefined && data.quantidade <= 0) {
            throw new common_1.BadRequestException('Quantidade deve ser maior que zero');
        }
        let novaQuantidade = material.quantidade_estoque;
        if (movimentoExistente.tipo === 'entrada') {
            novaQuantidade -= movimentoExistente.quantidade;
        }
        else {
            novaQuantidade += movimentoExistente.quantidade;
        }
        const tipoFinal = data.tipo || movimentoExistente.tipo;
        const quantidadeFinal = (_a = data.quantidade) !== null && _a !== void 0 ? _a : movimentoExistente.quantidade;
        if (tipoFinal === 'entrada') {
            novaQuantidade += quantidadeFinal;
        }
        else {
            if (novaQuantidade - quantidadeFinal < 0) {
                throw new common_1.BadRequestException(`Estoque insuficiente. Disponível: ${novaQuantidade}, Solicitado: ${quantidadeFinal}`);
            }
            novaQuantidade -= quantidadeFinal;
        }
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.material.update({
                where: { id: material.id },
                data: { quantidade_estoque: novaQuantidade },
            });
            return tx.stockMovement.update({
                where: { id },
                data: {
                    tipo: tipoFinal,
                    quantidade: quantidadeFinal,
                },
                include: {
                    material: { select: { id: true, nome: true, unidade_medida: true, quantidade_estoque: true } },
                    usuario: { select: { id: true, nome: true, email: true } },
                },
            });
        });
        return result;
    }
    async removeMovement(id) {
        const movimentoExistente = await this.prisma.stockMovement.findUnique({ where: { id } });
        if (!movimentoExistente) {
            throw new common_1.NotFoundException(`Movimentação com ID ${id} não encontrada`);
        }
        const material = await this.prisma.material.findUnique({ where: { id: movimentoExistente.materialId } });
        if (!material) {
            throw new common_1.NotFoundException(`Material associado à movimentação não encontrado`);
        }
        let novaQuantidade = material.quantidade_estoque;
        if (movimentoExistente.tipo === 'entrada') {
            novaQuantidade -= movimentoExistente.quantidade;
        }
        else {
            novaQuantidade += movimentoExistente.quantidade;
        }
        if (novaQuantidade < 0) {
            throw new common_1.BadRequestException(`Não é possível reverter esta movimentação. Estoque resultaria em ${novaQuantidade}`);
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.material.update({
                where: { id: material.id },
                data: { quantidade_estoque: novaQuantidade },
            });
            await tx.stockMovement.delete({ where: { id } });
        });
        return { message: 'Movimentação deletada com sucesso e estoque revertido' };
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockService);
//# sourceMappingURL=stock.service.js.map