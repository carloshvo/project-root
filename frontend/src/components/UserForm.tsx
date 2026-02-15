import { useState } from 'react';
import { createUser, updateUser, deleteUser } from '../api/userApi';
import { User, CreateUserInput, UpdateUserInput } from '../types';

interface UserFormProps {
  user?: User;
  onSaved: () => void;
}

interface FormData {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}

export default function UserForm({ user, onSaved }: UserFormProps) {
  const initialFormData: FormData = user
    ? { nome: user.nome, email: user.email, senha: '', perfil: user.perfil }
    : { nome: '', email: '', senha: '', perfil: '' };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        // Atualização: permita atualizar apenas campos específicos
        const updateData: UpdateUserInput = {
          nome: formData.nome?.trim() || undefined,
          email: formData.email?.trim() || undefined,
          perfil: formData.perfil || undefined,
        };
        // Só adiciona senha se foi preenchida
        if (formData.senha) {
          updateData.senha = formData.senha;
        }
        await updateUser(user.id, updateData);
        setFeedback('Usuário atualizado com sucesso!');
      } else {
        // Criação: todos os campos são obrigatórios
        const createData: CreateUserInput = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          senha: formData.senha,
          perfil: formData.perfil || 'operador',
        };
        await createUser(createData);
        setFeedback('Usuário criado com sucesso!');
        setFormData({ nome: '', email: '', senha: '', perfil: '' });
      }
      onSaved();
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Erro ao salvar usuário';
      const errorDetails = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage;
      setFeedback(`Erro: ${errorDetails}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteUser(user.id);
      setFeedback('Usuário excluído com sucesso!');
      setFormData({ nome: '', email: '', senha: '', perfil: '' });
      onSaved();
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Erro ao excluir usuário';
      const errorDetails = Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage;
      setFeedback(`Erro: ${errorDetails}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {feedback && (
        <p style={{ color: feedback.includes('Erro') ? 'red' : 'green' }}>
          {feedback}
        </p>
      )}

      <input
        type="text"
        value={formData.nome}
        onChange={e => setFormData({ ...formData, nome: e.target.value })}
        placeholder="Nome completo do usuário"
        disabled={loading}
      />
      <input
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        placeholder="E-mail de acesso"
        disabled={loading}
      />
      <input
        type="password"
        value={formData.senha}
        onChange={e => setFormData({ ...formData, senha: e.target.value })}
        placeholder={user ? 'Senha (deixe em branco para manter a atual)' : 'Senha de acesso'}
        disabled={loading}
      />
      <select
        value={formData.perfil}
        onChange={e => setFormData({ ...formData, perfil: e.target.value })}
        disabled={loading}
      >
        <option value="">Selecione o perfil</option>
        <option value="operador">Operador</option>
        <option value="admin">Administrador</option>
      </select>

      <button type="submit" disabled={loading}>
        {user ? 'Atualizar' : 'Criar'}
      </button>
      {user && (
        <button type="button" onClick={handleDelete} disabled={loading}>
          Excluir
        </button>
      )}
    </form>
  );
}
