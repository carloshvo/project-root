import { useEffect, useState } from 'react';
import { getMaterials } from '../api/materialApi';
import MaterialForm from '../components/MaterialForm';
import Feedback from '../components/Feedback';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const res = await getMaterials();
      setMaterials(res.data);
      setMessage(null);
    } catch {
      setMessage('Erro ao carregar materiais.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div>
      <h2>Materiais</h2>
      <Feedback loading={loading} message={message} />

      {/* Formulário direto na página */}
      <MaterialForm material={selectedMaterial || undefined} onSaved={loadMaterials} />

      <ul>
        {materials.map(m => (
          <li key={m.id}>
            <strong>{m.nome}</strong> ({m.unidade_medida}) - Estoque: {m.quantidade_estoque}
            <button onClick={() => setSelectedMaterial(m)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}