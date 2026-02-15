import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/users">Usuários</Link></li>
        <li><Link to="/materials">Materiais</Link></li>
        <li><Link to="/stock">Estoque</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;