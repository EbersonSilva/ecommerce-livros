# E-commerce - Backend (Node + TypeScript + Prisma)

Projeto de exemplo: backend em Node.js + TypeScript com Express e Prisma (SQLite).

**Descrição:**
- Backend para gerenciamento de clientes (CRUD) com busca por estratégia (nome, cpf, email).

**Pré-requisitos**
- Node.js (>=16)
- npm

**Portas padrão**
- Backend: 5013
- Frontend (Vite): 5173

**Executando o backend (desenvolvimento)**
1. Abra um terminal na pasta `backend`.
2. Instale dependências e gere/próprias do Prisma:

```powershell
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Observações:
- O banco de dados SQLite fica em `backend/dev.db` (conforme `DATABASE_URL`).
- Se alterar o schema, execute `npx prisma db push` e `npx prisma generate`.

**Executando o frontend**
1. Abra um terminal na pasta `frontend`.

```powershell
cd frontend
npm install
npm run dev
```

O frontend usa a variável `VITE_API_URL` para apontar para a API. Por padrão aponta para `http://localhost:5013`.

**Principais endpoints**
- POST /api/clientes — criar cliente
  - Exemplo payload (JSON):

```json
{
  "nome": "Maria Silva",
  "cpf": "123.456.789-00",
  "email": "maria@example.com",
  "telefone": "(11) 99999-9999",
  "enderecos": [
    { "logradouro": "Rua A", "numero": "100", "cep": "01000-000", "cidade": "São Paulo", "uf": "SP" }
  ],
  "cartoes": []
}
```

- GET /api/clientes — listar todos os clientes
- GET /api/clientes/:id — buscar cliente por id
- PUT /api/clientes/:id — atualizar cliente
- PATCH /api/clientes/:id/inativar — inativar cliente
- GET /api/clientes/consultar?tipo=<tipo>&valor=<valor>
  - `tipo` = `nome` | `cpf` | `email`
  - Ex.: `/api/clientes/consultar?tipo=nome&valor=Maria`

**Estrutura principal (backend)**
- `src/controllers` — rotas/handlers HTTP
- `src/services` — regras de negócio
- `src/repositories` — acesso a dados (Prisma)
- `src/strategies` — estratégias de busca (nome, cpf, email)
- `prisma/schema.prisma` — modelo Prisma

**Notas e próximos passos sugeridos**
- Recomendado: adicionar validações (CPF único, e-mail único) e autenticação (JWT) antes de produção.
- Para migrar o projeto para outro DB, adapte `prisma/schema.prisma` e a `DATABASE_URL`.


