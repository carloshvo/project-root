// backend/test/stock-movement.entity.spec.ts
import { StockMovement } from '../src/domain/stock-movement.entity';

describe('StockMovement Entity', () => {
  it('deve validar movimentação de entrada corretamente', () => {
    const movimento = new StockMovement(1, 'entrada', 10, new Date(), 1, 1);
    expect(() => movimento.validarMovimento()).not.toThrow();
  });

  it('não deve permitir quantidade zero ou negativa', () => {
    const movimento = new StockMovement(1, 'entrada', 0, new Date(), 1, 1);
    expect(() => movimento.validarMovimento()).toThrow('Quantidade deve ser maior que zero.');
  });

  it('não deve permitir tipo inválido', () => {
    const movimento = new StockMovement(1, 'invalido' as any, 5, new Date(), 1, 1);
    expect(() => movimento.validarMovimento()).toThrow('Tipo de movimentação inválido.');
  });
});