// backend/test/material.entity.spec.ts
import { Material } from '../src/domain/material.entity';

describe('Material Entity', () => {
  let material: Material;

  beforeEach(() => {
    material = new Material(
      1,
      'C001',
      'Cimento',
      'Cimento Portland',
      'Construção',
      'kg',
      10,
      2,
      new Date(),
      new Date(),
    );
  });

  it('deve adicionar estoque corretamente', () => {
    material.adicionarEstoque(5);
    expect(material.quantidadeEstoque).toBe(15);
  });

  it('não deve permitir saída maior que estoque', () => {
    expect(() => material.removerEstoque(20)).toThrow('Estoque insuficiente.');
  });

  it('deve validar estoque mínimo corretamente', () => {
    expect(material.validarEstoqueMinimo()).toBe(true);
  });
});