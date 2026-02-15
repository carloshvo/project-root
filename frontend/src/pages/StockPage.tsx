import { useEffect, useState } from 'react';
import { getStockMovements } from '../api/stockApi';
import StockForm from '../components/StockForm';
import Feedback from '../components/Feedback';

export default function StockPage() {
  const [movements, setMovements] = useState<any[]>([]);
  const [selectedMovement, setSelectedMovement] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadMovements = async () => {
    try {
      setLoading(true);
      const res = await getStockMovements();
      setMovements(res.data);
      setMessage(null);
    } catch {
      setMessage('Erro ao carregar movimentações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovements();
  }, []);

  return (
    <div>
      <h2>Movimentações de Estoque</h2>
      <Feedback loading={loading} message={message} />

      {/* Formulário direto na página */}
      <StockForm movement={selectedMovement || undefined} onSaved={loadMovements} />

      <ul>
        {movements.map(m => (
          <li key={m.id}>
            <strong>{m.tipo.toUpperCase()}</strong> - {m.quantidade} {m.material.unidade_medida} de <strong>{m.material.nome}</strong>
            em {new Date(m.data_movimentacao).toLocaleString()}
            {m.usuario && <> | Responsável: {m.usuario.nome}</>}
            <button onClick={() => setSelectedMovement(m)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}