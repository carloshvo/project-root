import { useState, useEffect } from 'react';
import { createStockMovement, updateStockMovement, deleteStockMovement } from '../api/stockApi';
import { getMaterials } from '../api/materialApi';
import { getUsers } from '../api/userApi';

interface StockFormProps {
  movement?: any;
  onSaved: () => void;
}

export default function StockForm({ movement, onSaved }: StockFormProps) {
  const [formData, setFormData] = useState(() => {
    if (movement) {
      return {
        materialId: movement.material?.id || '',
        materialName: movement.material?.nome || '',
        usuarioId: movement.usuario?.id || '',
        usuarioName: movement.usuario?.nome || '',
        tipo: movement.tipo || 'entrada',
        quantidade: movement.quantidade?.toString() || '', // agora string
      };
    }
    return {
      materialId: '',
      materialName: '',
      usuarioId: '',
      usuarioName: '',
      tipo: 'entrada',
      quantidade: '', // vazio para permitir placeholder
    };
  });

  const [materials, setMaterials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Busca materiais conforme texto digitado
  useEffect(() => {
    if (formData.materialName !== '') {
      getMaterials(formData.materialName)
        .then(res => setMaterials(res.data))
        .catch(() => setMaterials([]));
    } else {
      setMaterials([]);
    }
  }, [formData.materialName]);

  // Busca usuários conforme texto digitado
  useEffect(() => {
    if (formData.usuarioName !== '') {
      getUsers(formData.usuarioName)
        .then(res => setUsers(res.data))
        .catch(() => setUsers([]));
    } else {
      setUsers([]);
    }
  }, [formData.usuarioName]);

  const validateForm = () => {
    if (!formData.materialId) return 'Selecione um material válido';
    if (!formData.quantidade || Number(formData.quantidade) <= 0) return 'Quantidade deve ser maior que zero';
    if (!['entrada', 'saida'].includes(formData.tipo)) return 'Tipo inválido';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFeedback(`Erro: ${validationError}`);
      return;
    }
    try {
      if (movement?.id) {
        await updateStockMovement(movement.id, {
          tipo: formData.tipo,
          quantidade: Number(formData.quantidade),
        });
        setFeedback('Movimentação atualizada com sucesso!');
      } else {
        await createStockMovement({
          materialId: Number(formData.materialId),
          usuarioId: formData.usuarioId ? Number(formData.usuarioId) : undefined,
          tipo: formData.tipo,
          quantidade: Number(formData.quantidade),
        });
        setFeedback('Movimentação criada com sucesso!');
      }
      onSaved();
    } catch (err: any) {
      console.error('Erro ao salvar movimentação:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao salvar movimentação';
      const errorDetails = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage;
      setFeedback(`Erro: ${errorDetails}`);
    }
  };

  const handleDelete = async () => {
    if (movement?.id) {
      try {
        await deleteStockMovement(movement.id);
        setFeedback('Movimentação excluída com sucesso!');
        onSaved();
      } catch (err: any) {
        console.error('Erro ao excluir movimentação:', err);
        const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao excluir movimentação';
        const errorDetails = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage;
        setFeedback(`Erro: ${errorDetails}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {feedback && (
        <p style={{ color: feedback.toLowerCase().includes('erro') ? 'red' : 'green' }}>
          {feedback}
        </p>
      )}

      <input
        type="text"
        value={formData.materialName}
        onChange={e => setFormData({ ...formData, materialName: e.target.value, materialId: '' })}
        placeholder="Digite o nome do material"
      />
      {materials.length > 0 && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '100px', overflowY: 'auto' }}>
          {materials.map(m => (
            <li
              key={m.id}
              onClick={() => setFormData({ ...formData, materialId: m.id, materialName: m.nome })}
              style={{ cursor: 'pointer' }}
            >
              {m.nome} ({m.unidade_medida})
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={formData.usuarioName}
        onChange={e => setFormData({ ...formData, usuarioName: e.target.value, usuarioId: '' })}
        placeholder="Digite o nome do usuário (opcional)"
      />
      {users.length > 0 && (
        <ul style={{ border: '1px solid #ccc', maxHeight: '100px', overflowY: 'auto' }}>
          {users.map(u => (
            <li
              key={u.id}
              onClick={() => setFormData({ ...formData, usuarioId: u.id, usuarioName: u.nome })}
              style={{ cursor: 'pointer' }}
            >
              {u.nome} ({u.email})
            </li>
          ))}
        </ul>
      )}

      <select
        value={formData.tipo}
        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
      >
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
      </select>

      <input
        type="number"
        value={formData.quantidade}
        onChange={e => setFormData({ ...formData, quantidade: e.target.value })}
        placeholder="Quantidade"
      />

      <button type="submit">{movement?.id ? 'Atualizar' : 'Criar'}</button>
      {movement?.id && <button type="button" onClick={handleDelete}>Excluir</button>}
    </form>
  );
}