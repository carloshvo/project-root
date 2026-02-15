# Sistema de Controle de Estoque - Backend & Frontend

Aplicação completa para gerenciar estoque de materiais de construção com autenticação de usuários e rastreamento de movimentações.

## 📋 Estrutura do Projeto

```
project-root/
├── backend/                    # API NestJS com Prisma
│   ├── src/
│   │   ├── shared/            # PrismaService e tipos compartilhados
│   │   ├── user/              # Módulo de Usuários
│   │   ├── material/          # Módulo de Materiais
│   │   ├── stock/             # Módulo de Movimentações de Estoque
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + Vite + TypeScript
    ├── src/
    │   ├── api/                # Chamadas HTTP
    │   ├── components/         # Componentes React
    │   ├── pages/              # Páginas
    │   └── main.tsx
    └── package.json
```

## 🔧 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Backend

```bash
# 1. Entrar no diretório
cd backend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# 4. Executar migrations do Prisma
npm run prisma:migrate

# 5. Gerar cliente Prisma (se necessário)
npm run prisma:generate

# 6. Iniciar servidor em desenvolvimento
npm run start:dev
```

### Frontend

```bash
# 1. Entrar no diretório
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar em desenvolvimento
npm run dev
```

## 📚 Scripts Disponíveis

### Backend

```bash
npm run start           # Iniciar servidor em produção
npm run start:dev       # Iniciar servidor em desenvolvimento
npm run build           # Compilar TypeScript
npm run test            # Rodar testes
npm run test:watch      # Testes em modo watch
npm run test:cov        # Testes com cobertura
npm run prisma:migrate  # Executar migrations
npm run prisma:deploy   # Deploy de migrations
npm run prisma:generate # Regenerar cliente Prisma
```

### Frontend

```bash
npm run dev      # Iniciar dev server (http://localhost:5173)
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Executar ESLint
```

## 🔌 Endpoints da API

### Usuários
- `GET /api/users` - Listar usuários (filtro por nome)
- `GET /api/users/:id` - Obter usuário
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Materiais
- `GET /api/materials` - Listar materiais (filtro por nome)
- `GET /api/materials/:id` - Obter material
- `POST /api/materials` - Criar material
- `PUT /api/materials/:id` - Atualizar material
- `DELETE /api/materials/:id` - Deletar material

### Movimentações de Estoque
- `GET /api/stock/movements` - Listar movimentações
- `POST /api/stock/movements` - Criar movimentação
- `PUT /api/stock/movements/:id` - Atualizar movimentação
- `DELETE /api/stock/movements/:id` - Deletar movimentação

## 🔐 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Validação de entrada com class-validator
- ✅ Senhas nunca retornam nas respostas
- ✅ CORS configurável por variável de ambiente
- ✅ Tratamento de erros consistente com HttpException

## 📖 DTOs e Validação

Todos os endpoints usam DTOs com validação automática:

### CreateUserDto
```typescript
{
  nome: string       // Min 3 caracteres
  email: string      // Email válido
  senha: string      // Min 6 caracteres
  perfil?: 'admin' | 'operador'
}
```

### CreateMaterialDto
```typescript
{
  codigo: string     // Min 3 caracteres (UNIQUE)
  nome: string       // Min 3 caracteres
  descricao?: string
  categoria?: string
  unidade_medida: string
  quantidade_estoque: number
  estoque_minimo?: number
}
```

### CreateMovementDto
```typescript
{
  materialId: number
  usuarioId?: number
  tipo: 'entrada' | 'saida'
  quantidade: number // > 0
}
```

## 🗄️ Banco de Dados

O Prisma gerencia o schema. Modelos principais:

- **User**: Usuários do sistema com autenticação
- **Material**: Catálogo de materiais com controle de estoque
- **StockMovement**: Registro de todas as entradas/saídas

Migrations estão em `backend/prisma/migrations/`

## 🚀 Deploy

### Backend (Exemplo: Railway, Heroku)
```bash
# Configurar variáveis de ambiente em produção
# Rodar migrations
npm run prisma:deploy

# Iniciar servidor
npm run start
```

### Frontend (Exemplo: Vercel, Netlify)
```bash
npm run build
# Fazer upload do diretório dist/
```

## 🧪 Testes

```bash
# Backend
cd backend
npm run test        # Executar testes
npm run test:cov    # Com cobertura de código
```

## 📝 Variáveis de Ambiente

Ver [backend/.env.example](backend/.env.example) para todas as variáveis disponíveis.

```bash
DATABASE_URL         # String de conexão PostgreSQL
PORT                 # Porta do servidor (default: 3000)
NODE_ENV             # development/production
CORS_ORIGIN          # URL do frontend
```

## 💡 Melhorias Futuras

- [ ] Autenticação JWT
- [ ] Permissões baseadas em roles
- [ ] Testes de integração
- [ ] Documentação Swagger/OpenAPI
- [ ] Cache com Redis
- [ ] Relatórios e gráficos

## 📄 Licença

MIT

## 👤 Autor

Carlos
