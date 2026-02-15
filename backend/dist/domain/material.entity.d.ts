export declare class Material {
    id: number;
    codigo: string;
    nome: string;
    descricao: string | null;
    categoria: string | null;
    unidadeMedida: string;
    quantidadeEstoque: number;
    estoqueMinimo: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
    constructor(id: number, codigo: string, nome: string, descricao: string | null, categoria: string | null, unidadeMedida: string, quantidadeEstoque: number, estoqueMinimo: number, dataCriacao: Date, dataAtualizacao: Date);
    validarEstoqueMinimo(): boolean;
    adicionarEstoque(qtd: number): void;
    removerEstoque(qtd: number): void;
}
