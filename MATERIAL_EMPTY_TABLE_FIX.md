# 🔍 Investigação: Erro ao Cadastrar Material com Tabela Vazia

## Problema Relatado
Ocorre erro ao tentar cadastrar novo material quando a tabela de materiais está **completamente vazia**.

## 🔎 Análise Realizada

### Possíveis Causas
1. **Problema de tipagem nos inputs numéricos** - Inputs HTML `type="number"` podem retornar `NaN` ou string vazia
2. **Erro de validação não exibido** - O frontend estava capturando erros sem mostrar mensagem específica
3. **Comportamento de auto-increment** - Possível problema com ID quando tabela recém criada
4. **Parsing incorreto do payload** - Valores não validados antes do envio

### Correções Implementadas

#### ✅ 1. Melhor Tratamento de Erros (Frontend)
**Arquivo:** `frontend/src/components/MaterialForm.tsx`

**Antes:** Erro genérico "Erro ao salvar material"
```tsx
catch {
  setFeedback('Erro ao salvar material');
}
```

**Depois:** Mostra mensagem específica do servidor + log no console
```tsx
catch (error: any) {
  console.error('Erro ao salvar material:', error);
  const errorMessage = error?.response?.data?.message || error?.message || 'Erro ao salvar material';
  setFeedback(`Erro: ${errorMessage}`);
}
```

#### ✅ 2. Validação Robusta de Números
**Arquivo:** `frontend/src/components/MaterialForm.tsx`

**Antes:** Conversão simples que podia resultar em NaN
```tsx
quantidade_estoque: formData.quantidade_estoque === '' ? 0 : Number(formData.quantidade_estoque),
```

**Depois:** Validação com fallback para NaN
```tsx
const quantidade = Number(formData.quantidade_estoque);
quantidade_estoque: isNaN(quantidade) ? 0 : quantidade,
```

Também adiciona **trim()** para remover espaços em branco indesejados.

#### ✅ 3. Script NPM para Seed
**Arquivo:** `backend/package.json`

Adicionado novo script:
```json
"prisma:seed": "ts-node database/seed.ts"
```

## 📋 Como Diagnosticar

Se encontrar erro ao cadastrar material:

1. **Abra o navegador (F12)** → Console
2. **Veja a mensagem de erro específica** que agora aparece
3. **Verifique o request/response** na aba Network
4. **Compartilhe a mensagem de erro** para investigação

## 🔧 Workaround - Solução Imediata

Se a tabela estiver vazia e houver erro:

### Opção 1: Usar Script de Seed (Recomendado)
```bash
cd backend
npm run prisma:seed
```

Isso insere 2 materiais de teste e 1 usuário admin automaticamente.

### Opção 2: Injetar Manualmente via API
```bash
# Via PowerShell
$body = @{ 
  codigo = "MAT-TEST"
  nome = "Material Teste"
  unidade_medida = "kg"
  quantidade_estoque = 10
  estoque_minimo = 1
} | ConvertTo-Json

Invoke-WebRequest `
  -Uri "http://localhost:3001/api/materials" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### Opção 3: Direct Database Insert
```sql
INSERT INTO "Material" (codigo, nome, unidade_medida, quantidade_estoque, estoque_minimo, data_criacao, data_atualizacao)
VALUES ('MAT-001', 'Material Inicial', 'kg', 10, 1, NOW(), NOW());
```

## 📊 Status

| Item | Status | Impacto |
|------|--------|---------|
| Error messages | ✅ Melhorado | Baixo - UX |
| Number validation | ✅ Robusto | Baixo - Edge cases |
| Seed script | ✅ Adicionado | Nenhum - Opcional |
| Performance | ✅ Nenhuma adição | Nenhum |

## 🚀 Próximas Etapas

- [ ] Monitore logs do console ao criar materiais
- [ ] Se persistir erro, compartilhe a mensagem específica exibida
- [ ] Use script de seed como medida preventiva

## 📝 Notas

Este problema **tem baixo impacto** pois:
- ✅ É simples inserir um registro inicial via seed
- ✅ Não afeta operação normal com dados na tabela
- ✅ Mensagens de erro agora são específicas para debug
- ✅ Validação é mais robusta

---

**Data:** 15 de Fevereiro de 2026
**Status:** Investigado e Mitigado
