import { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';
import UserForm from '../components/UserForm';
import Feedback from '../components/Feedback';
import { User } from '../types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
      setMessage(null);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setMessage('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Usuários</h2>
      <Feedback loading={loading} message={message} />

      {/* Formulário direto na página */}
      <UserForm user={selectedUser || undefined} onSaved={loadUsers} />

      <ul>
        {users.map(u => (
          <li key={u.id}>
            <strong>{u.nome}</strong> ({u.email}) - Perfil: {u.perfil}
            <button onClick={() => setSelectedUser(u)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}