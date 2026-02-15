import { ReactNode } from 'react';

export default function App({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestão de Estoque</h1>
      {children}
    </div>
  );
}