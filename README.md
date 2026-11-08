
# Academic React — DevFlix | React, NestJS, Prisma e PostgreSQL

Projeto desenvolvido durante a Unidade Curricular de **Programação Web 2 — Senac RJ**, utilizando **React, Vite, NestJS, TypeScript, Prisma ORM, PostgreSQL e Docker Compose**.

---

# 1. Descrição

O **DevFlix** é uma aplicação web inspirada na Netflix, voltada para a disponibilização de aulas gratuitas de programação.

O projeto foi desenvolvido em duas etapas:

- **Tutorial 02:** criação da interface React, com catálogo de cursos, pesquisa, favoritos e reprodução de vídeos do YouTube.
- **Tutorial 03:** desenvolvimento da infraestrutura backend utilizando NestJS, Prisma ORM, PostgreSQL e Docker Compose.

Nesta etapa, o backend permite verificar a conexão com o banco de dados e consultar as categorias cadastradas.

A aplicação utiliza a seguinte arquitetura:

```text
React (Frontend)
      |
      | Interface web
      v
NestJS (API REST)
      |
      v
Prisma ORM
      |
      v
PostgreSQL
      |
      v
Docker Container
```

O frontend ainda utiliza dados locais para apresentar os cursos. A infraestrutura backend foi preparada para permitir a integração entre as aplicações nas próximas atividades.

---

# 2. Funcionalidades

O projeto possui as seguintes funcionalidades:

### Frontend — React

- Interface inspirada na Netflix;
- Catálogo de aulas de programação;
- Organização por categorias;
- Cards com informações dos cursos;
- Pesquisa de aulas por título;
- Sistema de favoritos;
- Reprodução de vídeos do YouTube;
- Interface responsiva.

### Backend — NestJS

- API REST desenvolvida com NestJS;
- Organização em Modules, Controllers e Services;
- Integração com Prisma ORM;
- Banco de dados PostgreSQL;
- Execução do PostgreSQL com Docker Compose;
- Migration inicial do banco;
- Cadastro de categorias;
- Endpoint de verificação de saúde;
- Endpoint de listagem de categorias;
- Teste automatizado do HealthController.

---

# 3. Tecnologias Utilizadas

- **React**
- **Vite**
- **JavaScript**
- **HTML**
- **CSS**
- **Node.js**
- **NestJS**
- **TypeScript**
- **Prisma ORM 7**
- **PostgreSQL 17**
- **Docker**
- **Docker Compose**
- **Vitest**
- **npm**
- **Git**
- **GitHub**

---

# 4. Arquitetura e Organização do Projeto

O DevFlix utiliza uma arquitetura com frontend e backend separados.

```text
Usuário
   |
   v
React + Vite
   |
   | Catálogo e interface
   v
Frontend

Backend REST
   |
   v
NestJS Controller
   |
   v
NestJS Service
   |
   v
PrismaService
   |
   v
Prisma ORM
   |
   v
PostgreSQL
   |
   v
Docker
```

Responsabilidades:

- `React` — interface e interação com o usuário;
- `NestJS` — gerenciamento da API REST;
- `Controllers` — recebimento das requisições HTTP;
- `Services` — implementação das regras e consultas;
- `PrismaService` — conexão da aplicação com o banco;
- `Prisma ORM` — acesso aos dados;
- `PostgreSQL` — armazenamento das categorias;
- `Docker Compose` — execução do banco em container.

---

# 5. Estrutura do Projeto

```text
academic-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── CourseCard.jsx
│   │   ├── CourseSection.jsx
│   │   └── VideoPlayer.jsx
│   ├── data/
│   │   └── courses.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── generated/
│   │   │   └── prisma/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── health/
│   │   │   ├── health.module.ts
│   │   │   ├── health.controller.ts
│   │   │   ├── health.service.ts
│   │   │   └── health.controller.spec.ts
│   │   ├── categories/
│   │   │   ├── categories.module.ts
│   │   │   ├── categories.controller.ts
│   │   │   └── categories.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env
│   ├── prisma.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

O arquivo `.env` deve permanecer apenas no ambiente local, sem ser enviado ao GitHub.

---

# 6. Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js 24;
- npm;
- Git;
- Docker Desktop com Docker Compose V2;
- Visual Studio Code ou editor equivalente.

O NestJS CLI pode ser executado por meio do `npx`, sem necessidade de instalação global.

---

# 7. Instalação

## 7.1 Clone o repositório

```bash
git clone https://github.com/matheuspessoa14/academic-react.git
```

## 7.2 Acesse o projeto

```bash
cd academic-react
```

## 7.3 Acesse a branch da atividade

```bash
git switch branch_20261103
```

## 7.4 Instale as dependências do frontend

```bash
npm install
```

## 7.5 Instale as dependências do backend

```bash
cd backend
npm install --legacy-peer-deps
```

O parâmetro `--legacy-peer-deps` foi utilizado durante o desenvolvimento para contornar um conflito na resolução de dependências do npm.

---

# 8. Configuração do PostgreSQL

O projeto utiliza PostgreSQL 17 executado em um container Docker.

Na raiz do projeto, o arquivo `docker-compose.yml` configura:

- Imagem PostgreSQL 17;
- Banco `devflix_db`;
- Usuário `devflix`;
- Volume persistente;
- Healthcheck do banco;
- Mapeamento da porta local 5433 para a porta 5432 do container.

## 8.1 Iniciar o banco

Na raiz do projeto:

```bash
docker compose up -d
```

## 8.2 Verificar os containers

```bash
docker compose ps
```

O PostgreSQL deverá aparecer em execução e com status saudável.

## 8.3 Acessar o PostgreSQL

```bash
docker exec -it devflix-postgres psql -U devflix -d devflix_db
```

## 8.4 Testar a conexão

```sql
SELECT current_database();
```

Resultado esperado:

```text
 current_database
------------------
 devflix_db
```

Para sair:

```text
\q
```

---

# 9. Configuração das Variáveis de Ambiente

Crie o arquivo `backend/.env`.

Exemplo para desenvolvimento local:

```env
DATABASE_URL="postgresql://devflix:devflix123@localhost:5433/devflix_db?schema=public"
```

A porta `5433` foi utilizada porque a porta `5432` estava indisponível no ambiente Windows durante a configuração.

O arquivo `.env` contém informações específicas do ambiente e não deve ser publicado.

Ele deve permanecer no `.gitignore`:

```gitignore
.env
```

As credenciais apresentadas são utilizadas apenas no ambiente acadêmico de desenvolvimento.

---

# 10. Prisma ORM

O Prisma ORM é responsável pela comunicação entre o backend NestJS e o PostgreSQL.

O modelo utilizado nesta atividade é:

```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

A entidade `Category` representa as categorias de cursos do DevFlix.

Campos:

- `id` — identificador único;
- `name` — nome da categoria;
- `slug` — identificador textual único;
- `createdAt` — data de criação;
- `updatedAt` — data da última atualização.

A comunicação com o banco segue o fluxo:

```text
Controller
    |
    v
Service
    |
    v
PrismaService
    |
    v
Prisma Client
    |
    v
PostgreSQL
```

---

# 11. Gerando o Prisma Client

Após configurar o banco e o arquivo `.env`, acesse a pasta `backend`:

```bash
cd backend
```

Execute:

```bash
npx prisma generate
```

O Prisma Client será gerado em:

```text
backend/src/generated/prisma/
```

Sempre que o schema for modificado, o Prisma Client deverá ser atualizado.

---

# 12. Migrations

Para criar e aplicar a migration inicial:

```bash
npx prisma migrate dev --name init
```

As migrations ficam armazenadas em:

```text
backend/prisma/migrations/
```

Para verificar o status:

```bash
npx prisma migrate status
```

Em um ambiente que já possui as migrations versionadas, elas também podem ser aplicadas com:

```bash
npx prisma migrate deploy
```

---

# 13. Dados de Teste

Foram cadastradas três categorias no banco de dados:

| ID | Nome | Slug |
| --- | --- | --- |
| 1 | Desenvolvimento Frontend | frontend |
| 2 | Desenvolvimento Backend | backend |
| 3 | Banco de Dados | banco-de-dados |

Os registros foram inseridos por meio do Prisma Studio.

Para abrir:

```bash
npx prisma studio
```

O Prisma Studio permite consultar e editar os registros da tabela `Category`.

Os IDs apresentados correspondem aos registros do ambiente utilizado durante o desenvolvimento e podem variar em outra instalação.

---

# 14. PrismaService

O `PrismaService` disponibiliza o Prisma Client para os módulos da aplicação NestJS.

Foi utilizado o adapter PostgreSQL:

```ts
import { PrismaPg } from '@prisma/adapter-pg';
```

A conexão utiliza a variável de ambiente:

```ts
const databaseUrl =
  configService.getOrThrow<string>('DATABASE_URL');
```

O adapter é configurado com:

```ts
const adapter = new PrismaPg({
  connectionString: databaseUrl,
});
```

O serviço também utiliza:

- `OnModuleInit` — estabelece a conexão;
- `OnModuleDestroy` — encerra a conexão.

O `PrismaModule` foi definido como global para permitir a utilização do PrismaService em outros módulos.

---

# 15. HealthModule

O HealthModule verifica a comunicação entre a aplicação e o banco de dados.

O endpoint implementado é:

```http
GET /health
```

O HealthService executa:

```ts
await this.prisma.$queryRaw`SELECT 1`;
```

Essa consulta verifica se o PostgreSQL está respondendo.

Quando a conexão está disponível, a aplicação retorna informações sobre seu estado.

---

# 16. CategoriesModule

O CategoriesModule é responsável pela consulta das categorias cadastradas no PostgreSQL.

O endpoint implementado é:

```http
GET /categories
```

O CategoriesService utiliza o Prisma:

```ts
return this.prisma.category.findMany({
  select: {
    id: true,
    name: true,
    slug: true,
  },
  orderBy: {
    id: 'asc',
  },
});
```

A consulta retorna as categorias em ordem crescente de ID.

---

# 17. Endpoints

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/` | Retorna a mensagem inicial do NestJS |
| `GET` | `/health` | Verifica a conexão da API com o banco |
| `GET` | `/categories` | Lista as categorias cadastradas |

A API utiliza a porta `3000`.

---

# 18. Exemplos de Requisição e Resposta

## 18.1 Health Check

Requisição:

```http
GET http://localhost:3000/health
```

Exemplo de resposta:

```json
{
  "status": "ok",
  "application": "DevFlix API",
  "database": "connected",
  "timestamp": "2026-11-03T18:00:00.000Z"
}
```

O campo `timestamp` é gerado dinamicamente.

## 18.2 Listar categorias

Requisição:

```http
GET http://localhost:3000/categories
```

Resposta:

```json
[
  {
    "id": 1,
    "name": "Desenvolvimento Frontend",
    "slug": "frontend"
  },
  {
    "id": 2,
    "name": "Desenvolvimento Backend",
    "slug": "backend"
  },
  {
    "id": 3,
    "name": "Banco de Dados",
    "slug": "banco-de-dados"
  }
]
```

---

# 19. Execução do Projeto

Para executar frontend e backend, utilize terminais separados.

## Terminal 1 — PostgreSQL

Na raiz do projeto:

```bash
docker compose up -d
```

## Terminal 2 — Backend NestJS

```bash
cd backend
npm run start:dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## Terminal 3 — Frontend React

Na raiz do projeto:

```bash
npm run dev
```

O frontend estará disponível normalmente em:

```text
http://localhost:5173
```

A integração do catálogo React com a API poderá ser desenvolvida nas próximas atividades.

---

# 20. Build

Para verificar a compilação do frontend:

```bash
npm run build
```

Para verificar a compilação do backend:

```bash
cd backend
npm run build
```

Os projetos devem compilar sem erros antes do envio da atividade.

---

# 21. Testes Realizados

Durante o desenvolvimento, foram realizados testes da infraestrutura e dos endpoints.

Foram verificados:

```text
GET /
GET /health
GET /categories
```

Também foram testados:

- Inicialização do PostgreSQL pelo Docker;
- Conexão com o banco `devflix_db`;
- Criação da migration inicial;
- Geração do Prisma Client;
- Cadastro das categorias;
- Consulta dos registros pelo Prisma Studio;
- Comunicação entre NestJS, Prisma e PostgreSQL;
- Compilação da aplicação;
- Teste automatizado do HealthController.

Para executar os testes automatizados:

```bash
cd backend
npm run test
```

O teste do HealthController utiliza um mock do HealthService e não depende da conexão real com PostgreSQL.

A conexão real foi verificada por meio do endpoint `/health`.

---

# 22. Conceitos Estudados

Nesta atividade foram estudados:

- Desenvolvimento de APIs REST;
- Arquitetura cliente-servidor;
- Separação de frontend e backend;
- NestJS;
- Modules, Controllers e Services;
- Injeção de dependência;
- TypeScript;
- ORM;
- Prisma Client;
- PostgreSQL;
- Docker Compose;
- Containers;
- Persistência de dados;
- Migrations;
- Variáveis de ambiente;
- Health Check;
- Endpoints HTTP;
- Testes automatizados;
- Separação de responsabilidades.

---

# 23. Arquitetura Antes e Depois

## Tutorial 02 — React

Inicialmente, o DevFlix utilizava um catálogo armazenado diretamente em JavaScript.

```text
React
  |
  v
courses.js
  |
  v
Catálogo de cursos
```

## Tutorial 03 — Backend

Nesta atividade, foi implementada uma infraestrutura para persistência e consulta de categorias.

```text
Cliente HTTP
    |
    v
NestJS Controller
    |
    v
NestJS Service
    |
    v
PrismaService
    |
    v
Prisma ORM
    |
    v
PostgreSQL
```

O catálogo React ainda permanece utilizando os dados locais. O backend está preparado para futuras integrações.

---

# 24. Versionamento e Organização das Branches

O projeto utiliza Git e GitHub para controle de versão.

Repositório:

```text
https://github.com/matheuspessoa14/academic-react
```

Organização:

| Branch | Atividade |
| --- | --- |
| `main` | Tutorial 02 — DevFlix React |
| `branch_20261103` | Tutorial 03 — NestJS, PostgreSQL, Docker e Prisma |

A branch `main` mantém a implementação inicial do frontend.

A branch `branch_20261103` contém a evolução da aplicação com a infraestrutura backend.

As atividades são desenvolvidas em branches independentes para preservar a organização dos tutoriais da disciplina.

---

# 25. Autor

**Nome:** Matheus Pessoa Telles de Oliveira  
**Unidade Curricular:** Programação Web 2  
**Instituição:** Senac RJ

GitHub:

```text
https://github.com/matheuspessoa14
```

---

# 26. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos na Unidade Curricular de **Programação Web 2 — Senac RJ**.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
