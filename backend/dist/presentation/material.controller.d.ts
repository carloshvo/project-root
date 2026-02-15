import { MaterialService } from '../application/material.service';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    create(dto: CreateMaterialDto): Promise<{
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
    findAll(): Promise<{
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    } | null>;
    update(id: number, dto: UpdateMaterialDto): Promise<{
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
        id: number;
    }>;
}
