export declare class CreateMaterialDto {
    codigo: string;
    nome: string;
    descricao?: string;
    categoria?: string;
    unidade_medida: string;
    quantidade_estoque?: number;
    estoque_minimo?: number;
}
export declare class UpdateMaterialDto {
    codigo?: string;
    nome?: string;
    descricao?: string;
    categoria?: string;
    unidade_medida?: string;
    quantidade_estoque?: number;
    estoque_minimo?: number;
}
