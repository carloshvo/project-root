"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
class Material {
    constructor(id, codigo, nome, descricao, categoria, unidadeMedida, quantidadeEstoque, estoqueMinimo, dataCriacao, dataAtualizacao) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.unidadeMedida = unidadeMedida;
        this.quantidadeEstoque = quantidadeEstoque;
        this.estoqueMinimo = estoqueMinimo;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
    }
    validarEstoqueMinimo() {
        return this.quantidadeEstoque >= this.estoqueMinimo;
    }
    adicionarEstoque(qtd) {
        if (qtd <= 0)
            throw new Error('Quantidade inválida para entrada.');
        this.quantidadeEstoque += qtd;
    }
    removerEstoque(qtd) {
        if (qtd <= 0)
            throw new Error('Quantidade inválida para saída.');
        if (this.quantidadeEstoque - qtd < 0)
            throw new Error('Estoque insuficiente.');
        this.quantidadeEstoque -= qtd;
    }
}
exports.Material = Material;
//# sourceMappingURL=material.entity.js.map