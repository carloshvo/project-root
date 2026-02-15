export declare class CreateMaterialDto {
    codigo: string;
    nome: string;
    descricao?: string | null;
    categoria?: string | null;
    unidade_medida: string;
    quantidade_estoque: number;
    estoque_minimo?: number;
}
export declare class UpdateMaterialDto {
    codigo?: string;
    nome?: string;
    descricao?: string | null;
    categoria?: string | null;
    unidade_medida?: string;
    quantidade_estoque?: number;
    estoque_minimo?: number;
}
