import { useState } from 'react';
import { createMaterial, updateMaterial, deleteMaterial } from '../api/materialApi';

interface MaterialFormProps {
  material?: any;
  onSaved: () => void;
}

export default function MaterialForm({ material, onSaved }: MaterialFormProps) {
  const [formData, setFormData] = useState(material || {
    codigo: '',
    nome: '',
    descricao: '',
    categoria: '',
    unidade_medida: '',
    quantidade_estoque: '',
    estoque_minimo: '',
  });

  const [feedback, setFeedback] = useState<string | null>(null);

  const normalizePayload = () => {
    const quantidade = Number(formData.quantidade_estoque);
    const minimo = Number(formData.estoque_minimo);

    return {
      codigo: formData.codigo.trim(),
      nome: formData.nome.trim(),
      descricao: formData.descricao?.trim() || null,
      categoria: formData.categoria?.trim() || null,
      unidade_medida: formData.unidade_medida.trim(),
      quantidade_estoque: isNaN(quantidade) ? 0 : quantidade,
      estoque_minimo: isNaN(minimo) ? 0 : minimo,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = normalizePayload();
      if (material) {
        await updateMaterial(material.id, payload);
        setFeedback('Material atualizado com sucesso!');
      } else {
        await createMaterial(payload);
        setFeedback('Material criado com sucesso!');
      }
      onSaved();
    } catch (error: any) {
      console.error('Erro ao salvar material:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Erro ao salvar material';
      setFeedback(`Erro: ${errorMessage}`);
    }
  };

  const handleDelete = async () => {
    if (material) {
      try {
        await deleteMaterial(material.id);
        setFeedback('Material excluído com sucesso!');
        onSaved();
      } catch (error: any) {
        console.error('Erro ao excluir material:', error);
        const errorMessage = error?.response?.data?.message || error?.message || 'Erro ao excluir material';
        setFeedback(`Erro: ${errorMessage}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {feedback && <p style={{ color: feedback.includes('Erro') ? 'red' : 'green' }}>{feedback}</p>}

      <input value={formData.codigo} onChange={e => setFormData({ ...formData, codigo: e.target.value })} placeholder="Código do material" />
      <input value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} placeholder="Nome do material" />
      <input value={formData.descricao} onChange={e => setFormData({ ...formData, descricao: e.target.value })} placeholder="Descrição detalhada (opcional)" />
      <input value={formData.categoria} onChange={e => setFormData({ ...formData, categoria: e.target.value })} placeholder="Categoria (opcional)" />
      <input value={formData.unidade_medida} onChange={e => setFormData({ ...formData, unidade_medida: e.target.value })} placeholder="Unidade de medida (ex.: kg, unidade)" />
      <input type="number" value={formData.quantidade_estoque} onChange={e => setFormData({ ...formData, quantidade_estoque: e.target.value })} placeholder="Quantidade em estoque atual" />
      <input type="number" value={formData.estoque_minimo} onChange={e => setFormData({ ...formData, estoque_minimo: e.target.value })} placeholder="Estoque mínimo permitido" />

      <button type="submit">{material ? 'Atualizar' : 'Criar'}</button>
      {material && <button type="button" onClick={handleDelete}>Excluir</button>}
    </form>
  );
}