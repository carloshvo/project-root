export declare class CreateMovementDto {
    materialId: number;
    usuarioId?: number;
    tipo: 'entrada' | 'saida';
    quantidade: number;
}
export declare class UpdateMovementDto {
    tipo?: 'entrada' | 'saida';
    quantidade?: number;
}
