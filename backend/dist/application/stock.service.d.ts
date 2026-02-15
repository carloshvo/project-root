import { PrismaService } from '../infrastructure/prisma.service';
export declare class StockService {
    private prisma;
    constructor(prisma: PrismaService);
    entrada(materialId: number, quantidade: number, usuarioId: number): Promise<{
        nome: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
        codigo: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
    }>;
    saida(materialId: number, quantidade: number, usuarioId: number): Promise<{
        nome: string;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
        codigo: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
    }>;
    historico(): Promise<{
        id: number;
        tipo: string;
        quantidade: number;
        data_movimentacao: Date;
        materialId: number;
        usuarioId: number | null;
    }[]>;
}
