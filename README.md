
# Academic React — DevFlix

Projeto acadêmico desenvolvido na Unidade Curricular de **Programação Web II — Senac RJ**, utilizando React, NestJS, TypeScript, Prisma ORM, PostgreSQL e Docker.

## 1. Descrição

O DevFlix é uma plataforma de cursos de programação inspirada na Netflix.

No Tutorial 02, desenvolvemos o frontend com React. No Tutorial 03, implementamos a API NestJS e a conexão com o PostgreSQL.

O **Tutorial 04 — Modelando Cursos e Aulas com Prisma** amplia a estrutura do banco de dados, adicionando os modelos Course e Lesson e implementando relacionamentos entre categorias, cursos e aulas.

## 2. Funcionalidades

- Catálogo de cursos com React;
- Pesquisa e favoritos;
- Reprodução de vídeos do YouTube;
- API REST com NestJS;
- Persistência com PostgreSQL;
- Integração com Prisma ORM;
- Relacionamentos 1:N;
- Migrations versionadas;
- Seed automático de dados;
- Consulta de cursos e aulas;
- Validação de identificadores;
- Tratamento de erros HTTP;
- Testes automatizados com Vitest.

## 3. Tecnologias

- React e Vite
- JavaScript e CSS
- Node.js e TypeScript
- NestJS
- Prisma ORM 7
- PostgreSQL 17
- Docker Compose
- Vitest
- Git e GitHub

## 4. Arquitetura

```text
Frontend React
      |
      v
API REST NestJS
      |
      v
Controllers
      |
      v
Services
      |
      v
Prisma ORM
      |
      v
PostgreSQL
```

Nesta etapa, o catálogo React ainda utiliza dados locais. A API permite consultar os dados persistidos no PostgreSQL.

## 5. Modelagem do Banco de Dados

A aplicação utiliza três entidades:

```text
Category (1)
    |
    | 1:N
    v
Course (N)
    |
    | 1:N
    v
Lesson (N)
```

### Category

Armazena as categorias dos cursos.

- id
- name
- slug
- createdAt
- updatedAt

### Course

Armazena os cursos e suas informações.

- id
- title
- slug
- description
- thumbnail
- published
- categoryId
- createdAt
- updatedAt

### Lesson

Armazena as aulas pertencentes aos cursos.

- id
- title
- description
- videoId
- position
- courseId
- createdAt
- updatedAt

## 6. Relacionamentos

Uma categoria pode possuir vários cursos, enquanto cada curso pertence a uma categoria.

Um curso pode possuir várias aulas, enquanto cada aula pertence a um curso.

Foram utilizadas as seguintes restrições:

- `onDelete: Restrict` impede excluir categorias que possuem cursos;
- `onDelete: Cascade` remove as aulas associadas quando um curso é excluído;
- `@@unique([courseId, position])` impede posições duplicadas no mesmo curso;
- Índices para otimizar consultas por chaves estrangeiras.

## 7. Estrutura do Projeto

```text
academic-react/
├── src/
│   ├── components/
│   ├── data/
│   ├── App.jsx
│   └── App.css
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── prisma/
│   │   ├── health/
│   │   ├── categories/
│   │   ├── courses/
│   │   └── app.module.ts
│   ├── prisma7.config.ts
│   └── package.json
├── docker-compose.yml
├── package.json
└── README.md
```

## 8. Instalação

Clone o repositório:

```bash
git clone https://github.com/matheuspessoa14/academic-react.git
cd academic-react
git switch branch_20261110
```

Instale as dependências do frontend:

```bash
npm install
```

Instale as dependências do backend:

```bash
cd backend
npm install --legacy-peer-deps
```

## 9. PostgreSQL com Docker

O banco de dados utiliza PostgreSQL 17 através do Docker Compose.

Na raiz do projeto:

```bash
docker compose up -d
docker compose ps
```

A configuração local utiliza a porta `5433`, encaminhada para a porta `5432` do container.

## 10. Variáveis de Ambiente

Crie o arquivo `backend/.env` com a configuração local:

```env
DATABASE_URL="postgresql://devflix:devflix123@localhost:5433/devflix_db?schema=public"
```

As credenciais são apenas para desenvolvimento acadêmico.

O arquivo `.env` deve permanecer no `.gitignore`.

## 11. Prisma ORM

O Prisma realiza as consultas ao PostgreSQL através do PrismaService.

Os modelos são definidos em:

```text
backend/prisma/schema.prisma
```

Para validar o schema:

```bash
npx prisma validate
```

Para aplicar as migrations existentes:

```bash
npx prisma migrate deploy
```

Para gerar o Prisma Client:

```bash
npx prisma generate
```

As migrations implementadas até esta atividade são:

- `init` — criação da entidade Category;
- `add_courses_lessons` — criação das entidades Course e Lesson.

## 12. Seed do Banco de Dados

O seed permite cadastrar automaticamente as categorias, cursos e aulas.

Execute na pasta backend:

```bash
npx prisma db seed
```

O script utiliza `upsert()` para criar ou atualizar registros, evitando duplicações de cursos e aulas nas execuções seguintes.

Para visualizar os dados:

```bash
npx prisma studio
```

## 13. Dados Cadastrados

Foram utilizados três cursos:

| Curso | Categoria | Aulas |
| --- | --- | --- |
| React para Iniciantes | Desenvolvimento Frontend | 2 |
| Node.js para Iniciantes | Desenvolvimento Backend | 1 |
| Fundamentos de SQL | Banco de Dados | 1 |

Total de registros do seed:

- 3 categorias;
- 3 cursos;
- 4 aulas.

## 14. Módulo Courses

Foi criado o módulo Courses no NestJS.

O CoursesService utiliza o Prisma Client para consultar os cursos.

A consulta `findMany()` recupera todos os cursos, incluindo suas categorias e aulas.

O método `findUnique()` permite recuperar um curso específico por ID.

O parâmetro `include` permite carregar os relacionamentos, e `orderBy` organiza as aulas por posição.

## 15. Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica a conexão com o banco |
| GET | `/categories` | Lista as categorias |
| GET | `/courses` | Lista os cursos com categorias e aulas |
| GET | `/courses/:id` | Consulta um curso por ID |

A API utiliza:

```text
http://localhost:3000
```

Exemplos:

```http
GET http://localhost:3000/courses
GET http://localhost:3000/courses/1
```

Erros tratados:

- HTTP 404 — curso inexistente;
- HTTP 400 — identificador inválido.

## 16. Executando a Aplicação

### Banco de dados

Na raiz do projeto:

```bash
docker compose up -d
```

### Backend

```bash
cd backend
npm run start:dev
```

API:

```text
http://localhost:3000
```

### Frontend

Em outro terminal, na raiz do projeto:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 17. Testes Automatizados

Os testes utilizam Vitest e mocks do Prisma.

Foram implementados testes para:

- Listagem de cursos;
- Consulta de curso por ID;
- Tratamento de curso inexistente.

Também foram preservados os testes dos módulos anteriores.

Execute:

```bash
cd backend
npm run test
```

Resultado obtido:

```text
Test Files  3 passed (3)
Tests       5 passed (5)
```

Todos os cinco testes foram aprovados.

## 18. Testes dos Relacionamentos

Foram realizadas consultas SQL diretamente no PostgreSQL para verificar as associações entre cursos, categorias e aulas.

A consulta confirmou:

```text
Fundamentos de SQL       | Banco de Dados           | 1 aula
Node.js para Iniciantes  | Desenvolvimento Backend  | 1 aula
React para Iniciantes    | Desenvolvimento Frontend | 2 aulas
```

Os relacionamentos estão funcionando conforme a modelagem definida.

## 19. Build

Para verificar a compilação do backend:

```bash
cd backend
npm run build
```

Para compilar o frontend, execute na raiz:

```bash
npm run build
```

## 20. Conceitos Estudados

- Modelagem de bancos relacionais;
- Relacionamentos um para muitos;
- Chaves primárias e estrangeiras;
- Integridade referencial;
- Prisma ORM;
- Prisma Migrate;
- Prisma Seed;
- Métodos `upsert`, `findMany` e `findUnique`;
- Consultas com `include`;
- APIs REST com NestJS;
- Controllers e Services;
- Testes automatizados.

## 21. Versionamento

Repositório:

https://github.com/matheuspessoa14/academic-react

| Branch | Atividade |
| --- | --- |
| main | Tutorial 02 — React DevFlix |
| branch_20261103 | Tutorial 03 — NestJS, Docker e Prisma |
| branch_20261110 | Tutorial 04 — Modelagem de Cursos e Aulas |

Cada tutorial é desenvolvido em uma branch específica, preservando as versões anteriores.

## 22. Autor

**Nome:** Matheus Pessoa Telles de Oliveira

**Unidade Curricular:** Programação Web II

**Instituição:** Senac RJ

**GitHub:** https://github.com/matheuspessoa14

## 23. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de Programação Web II — Senac RJ.

O código poderá ser utilizado para avaliação e acompanhamento das atividades da disciplina.
