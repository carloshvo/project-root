import { PrismaService } from '../infrastructure/prisma.service';
export declare class MaterialService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
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
    findAll(): Promise<{
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
    }[]>;
    findOne(id: number): Promise<{
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
    } | null>;
    update(id: number, dto: any): Promise<{
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
    remove(id: number): Promise<{
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
}
