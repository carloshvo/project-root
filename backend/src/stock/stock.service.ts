import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { CreateMovementDto, UpdateMovementDto } from './dto/stock.dto';
import { StockMovementWithRelations } from '../shared/types';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) { }

  async findAllMovements(): Promise<StockMovementWithRelations[]> {
    return this.prisma.stockMovement.findMany({
      include: {
        material: { select: { id: true, nome: true, unidade_medida: true, quantidade_estoque: true } },
        usuario: { select: { id: true, nome: true, email: true } },
      },
      orderBy: { data_movimentacao: 'desc' },
    }) as Promise<StockMovementWithRelations[]>;
  }

  async createMovement(data: CreateMovementDto): Promise<StockMovementWithRelations> {
    // Validações iniciais antes da transação
    if (data.quantidade <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero');
    }

    const material = await this.prisma.material.findUnique({ where: { id: data.materialId } });
    if (!material) {
      throw new NotFoundException(`Material com ID ${data.materialId} não encontrado`);
    }

    if (data.usuarioId) {
      const usuario = await this.prisma.user.findUnique({ where: { id: data.usuarioId } });
      if (!usuario) {
        throw new NotFoundException(`Usuário com ID ${data.usuarioId} não encontrado`);
      }
    }

    // Calcula nova quantidade e valida
    let novaQuantidade = material.quantidade_estoque;
    if (data.tipo === 'entrada') {
      novaQuantidade += data.quantidade;
    } else {
      if (novaQuantidade - data.quantidade < 0) {
        throw new BadRequestException(
          `Estoque insuficiente. Disponível: ${material.quantidade_estoque}, Solicitado: ${data.quantidade}`
        );
      }
      novaQuantidade -= data.quantidade;
    }

    // Executa operações em transação (atômico)
    const result = await this.prisma.$transaction(async (tx) => {
      // Atualiza material
      await tx.material.update({
        where: { id: data.materialId },
        data: { quantidade_estoque: novaQuantidade },
      });

      // Cria movimentação
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

    return result as StockMovementWithRelations;
  }

  async updateMovement(id: number, data: UpdateMovementDto): Promise<StockMovementWithRelations> {
    // Busca a movimentação existente
    const movimentoExistente = await this.prisma.stockMovement.findUnique({ where: { id } });
    if (!movimentoExistente) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada`);
    }

    const material = await this.prisma.material.findUnique({ where: { id: movimentoExistente.materialId } });
    if (!material) {
      throw new NotFoundException(`Material associado à movimentação não encontrado`);
    }

    // Valida quantidade se fornecida
    if (data.quantidade !== undefined && data.quantidade <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero');
    }

    // Recalcula estoque se quantidade/tipo mudaram
    let novaQuantidade = material.quantidade_estoque;

    // Remove efeito da movimentação antiga
    if (movimentoExistente.tipo === 'entrada') {
      novaQuantidade -= movimentoExistente.quantidade;
    } else {
      novaQuantidade += movimentoExistente.quantidade;
    }

    // Aplica efeito da nova movimentação
    const tipoFinal = data.tipo || movimentoExistente.tipo;
    const quantidadeFinal = data.quantidade ?? movimentoExistente.quantidade;

    if (tipoFinal === 'entrada') {
      novaQuantidade += quantidadeFinal;
    } else {
      if (novaQuantidade - quantidadeFinal < 0) {
        throw new BadRequestException(
          `Estoque insuficiente. Disponível: ${novaQuantidade}, Solicitado: ${quantidadeFinal}`
        );
      }
      novaQuantidade -= quantidadeFinal;
    }

    // Executa operações em transação (atômico)
    const result = await this.prisma.$transaction(async (tx) => {
      // Atualiza material
      await tx.material.update({
        where: { id: material.id },
        data: { quantidade_estoque: novaQuantidade },
      });

      // Atualiza movimentação
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

    return result as StockMovementWithRelations;
  }

  async removeMovement(id: number): Promise<{ message: string }> {
    const movimentoExistente = await this.prisma.stockMovement.findUnique({ where: { id } });
    if (!movimentoExistente) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada`);
    }

    const material = await this.prisma.material.findUnique({ where: { id: movimentoExistente.materialId } });
    if (!material) {
      throw new NotFoundException(`Material associado à movimentação não encontrado`);
    }

    // Recalcula quantidade revertendo a movimentação
    let novaQuantidade = material.quantidade_estoque;
    if (movimentoExistente.tipo === 'entrada') {
      novaQuantidade -= movimentoExistente.quantidade;
    } else {
      // Se era saída, adiciona de volta
      novaQuantidade += movimentoExistente.quantidade;
    }

    // Se resultado é negativo, pode haver problema na reversão
    if (novaQuantidade < 0) {
      throw new BadRequestException(
        `Não é possível reverter esta movimentação. Estoque resultaria em ${novaQuantidade}`
      );
    }

    // Executa operações em transação (atômico)
    await this.prisma.$transaction(async (tx) => {
      // Atualiza material
      await tx.material.update({
        where: { id: material.id },
        data: { quantidade_estoque: novaQuantidade },
      });

      // Deleta movimentação
      await tx.stockMovement.delete({ where: { id } });
    });

    return { message: 'Movimentação deletada com sucesso e estoque revertido' };
  }
}
