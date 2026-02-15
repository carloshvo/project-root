export type TipoMovimento = 'entrada' | 'saida';
export declare class StockMovement {
    id: number;
    tipo: TipoMovimento;
    quantidade: number;
    dataMovimentacao: Date;
    materialId: number;
    usuarioId: number | null;
    constructor(id: number, tipo: TipoMovimento, quantidade: number, dataMovimentacao: Date, materialId: number, usuarioId: number | null);
    validarMovimento(): void;
}
