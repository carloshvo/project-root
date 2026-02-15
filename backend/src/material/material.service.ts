import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { Material } from '../shared/types';

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) { }

  async findAll(search?: string): Promise<Material[]> {
    return this.prisma.material.findMany({
      where: search
        ? { nome: { contains: search, mode: 'insensitive' } }
        : {},
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) {
      throw new NotFoundException(`Material com ID ${id} não encontrado`);
    }
    return material;
  }

  async create(data: CreateMaterialDto): Promise<Material> {
    // Verifica se código já existe
    const existingMaterial = await this.prisma.material.findUnique({ where: { codigo: data.codigo } });
    if (existingMaterial) {
      throw new ConflictException(`Material com código ${data.codigo} já existe`);
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

  async update(id: number, data: UpdateMaterialDto): Promise<Material> {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) {
      throw new NotFoundException(`Material com ID ${id} não encontrado`);
    }

    // Se está atualizando código, verifica se é único
    if (data.codigo && data.codigo !== material.codigo) {
      const existingMaterial = await this.prisma.material.findUnique({ where: { codigo: data.codigo } });
      if (existingMaterial) {
        throw new ConflictException(`Material com código ${data.codigo} já existe`);
      }
    }

    return this.prisma.material.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const material = await this.prisma.material.findUnique({ where: { id } });
    if (!material) {
      throw new NotFoundException(`Material com ID ${id} não encontrado`);
    }
    await this.prisma.material.delete({ where: { id } });
    return { message: 'Material deletado com sucesso' };
  }
}
