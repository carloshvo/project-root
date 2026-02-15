import { StockService } from '../application/stock.service';
import { EntradaEstoqueDto, SaidaEstoqueDto } from './dto/stock.dto';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    entrada(dto: EntradaEstoqueDto): Promise<{
        id: number;
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
    }>;
    saida(dto: SaidaEstoqueDto): Promise<{
        id: number;
        codigo: string;
        nome: string;
        descricao: string | null;
        categoria: string | null;
        unidade_medida: string;
        quantidade_estoque: number;
        estoque_minimo: number;
        data_criacao: Date;
        data_atualizacao: Date;
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
