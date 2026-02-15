"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMovement = void 0;
class StockMovement {
    constructor(id, tipo, quantidade, dataMovimentacao, materialId, usuarioId) {
        this.id = id;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.dataMovimentacao = dataMovimentacao;
        this.materialId = materialId;
        this.usuarioId = usuarioId;
    }
    validarMovimento() {
        if (this.quantidade <= 0) {
            throw new Error('Quantidade deve ser maior que zero.');
        }
        if (this.tipo !== 'entrada' && this.tipo !== 'saida') {
            throw new Error('Tipo de movimentação inválido.');
        }
    }
}
exports.StockMovement = StockMovement;
//# sourceMappingURL=stock-movement.entity.js.map