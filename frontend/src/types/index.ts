// tipos compartilhados entre frontend e backend
export interface User {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    data_criacao: Date;
    data_atualizacao: Date;
}

export interface CreateUserInput {
    nome: string;
    email: string;
    senha: string;
    perfil?: string;
}

export interface UpdateUserInput {
    nome?: string;
    email?: string;
    senha?: string;
    perfil?: string;
}

export interface Material {
    id: number;
    codigo: string;
    nome: string;
    descricao?: string | null;
    categoria?: string | null;
    unidade_medida: string;
    quantidade_estoque: number;
    estoque_minimo: number;
    data_criacao: Date;
    data_atualizacao: Date;
}

export interface CreateMaterialInput {
    codigo: string;
    nome: string;
    descricao?: string | null;
    categoria?: string | null;
    unidade_medida: string;
    quantidade_estoque: number;
    estoque_minimo?: number;
}

export interface UpdateMaterialInput {
    codigo?: string;
    nome?: string;
    descricao?: string | null;
    categoria?: string | null;
    unidade_medida?: string;
    quantidade_estoque?: number;
    estoque_minimo?: number;
}

export interface StockMovement {
    id: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
    data_movimentacao: Date;
    material: {
        id: number;
        nome: string;
        unidade_medida: string;
        quantidade_estoque: number;
    };
    usuario?: {
        id: number;
        nome: string;
        email: string;
    } | null;
}

export interface CreateMovementInput {
    materialId: number;
    usuarioId?: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
}

export interface UpdateMovementInput {
    tipo?: 'entrada' | 'saida';
    quantidade?: number;
}
