import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import UsersPage from './pages/UsersPage';
import MaterialsPage from './pages/MaterialsPage';
import StockPage from './pages/StockPage';
import './index.css'; // CSS global

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <nav>
          <Link to="/users">Usuários</Link>
          <Link to="/materials">Materiais</Link>
          <Link to="/stock">Estoque</Link>
        </nav>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/" element={<UsersPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);