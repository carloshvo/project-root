export interface User {
    id: number;
    nome: string;
    email: string;
    perfil: string;
    data_criacao: Date;
    data_atualizacao: Date;
}
export interface UserResponse extends Omit<User, 'senha'> {
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
export interface StockMovement {
    id: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
    data_movimentacao: Date;
    materialId: number;
    usuarioId?: number | null;
}
export interface StockMovementWithRelations extends StockMovement {
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
