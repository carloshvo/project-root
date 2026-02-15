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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/prisma.service");
let MaterialsService = class MaterialsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search) {
        return this.prisma.material.findMany({
            where: search
                ? { nome: { contains: search, mode: 'insensitive' } }
                : {},
            orderBy: { nome: 'asc' },
        });
    }
    async findOne(id) {
        const material = await this.prisma.material.findUnique({ where: { id } });
        if (!material) {
            throw new common_1.NotFoundException(`Material com ID ${id} não encontrado`);
        }
        return material;
    }
    async create(data) {
        const existingMaterial = await this.prisma.material.findUnique({ where: { codigo: data.codigo } });
        if (existingMaterial) {
            throw new common_1.ConflictException(`Material com código ${data.codigo} já existe`);
        }
        return this.prisma.material.create({
            data: {
                codigo: data.codigo,
                nome: data.nome,
                descricao: data.descricao || null,
                categoria: data.categoria || null,
                unidade_medida: data.unidade_medida,
                quantidade_estoque: data.quantidade_estoque,
                estoque_minimo: data.estoque_minimo || 0,
            },
        });
    }
    async update(id, data) {
        const material = await this.prisma.material.findUnique({ where: { id } });
        if (!material) {
            throw new common_1.NotFoundException(`Material com ID ${id} não encontrado`);
        }
        if (data.codigo && data.codigo !== material.codigo) {
            const existingMaterial = await this.prisma.material.findUnique({ where: { codigo: data.codigo } });
            if (existingMaterial) {
                throw new common_1.ConflictException(`Material com código ${data.codigo} já existe`);
            }
        }
        return this.prisma.material.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        const material = await this.prisma.material.findUnique({ where: { id } });
        if (!material) {
            throw new common_1.NotFoundException(`Material com ID ${id} não encontrado`);
        }
        await this.prisma.material.delete({ where: { id } });
        return { message: 'Material deletado com sucesso' };
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialsService);
//# sourceMappingURL=material.service.js.map