# Around The U.S.

Aplicação full-stack (MERN) desenvolvida como projeto final do bootcamp de desenvolvimento web da TripleTen. O projeto consiste em uma rede social de fotos onde usuários podem se cadastrar, fazer login, editar seu perfil e avatar, e publicar, curtir e remover cartões de lugares que já visitaram.

🔗 **Aplicação online:** [flp-around-us.verymad.net](https://flp-around-us.verymad.net)
🔗 **API (backend):** [api.flp-around-us.verymad.net](https://api.flp-around-us.verymad.net)

---

## 📋 Descrição do projeto

O "Around The U.S." é dividido em duas partes que vivem no mesmo repositório (monorepo):

- **`frontend/`**: Interface em React responsável por toda a experiência do usuário: cadastro, login, exibição do perfil, listagem de cartões, upload de novos lugares, curtidas e exclusão.
- **`backend/`**: API REST em Node.js/Express responsável por autenticação, validação de dados e persistência das informações de usuários e cartões no MongoDB.

Principais funcionalidades:

- Cadastro e autenticação de usuários com JWT
- Rotas protegidas (usuário precisa estar logado para acessar o perfil)
- Edição de nome, "sobre mim" e avatar do usuário
- Criação, listagem e remoção de cartões (apenas o dono pode remover)
- Curtir/descurtir cartões
- Validação de dados de entrada (`celebrate`/`Joi`)
- Tratamento centralizado de erros
- Deploy completo em nuvem, com HTTPS via certificado SSL

---

## 🛠️ Tecnologias e técnicas utilizadas

### Frontend
- React 19
- React Router
- Vite (bundler e dev server)
- Fetch API para comunicação com o backend
- Context API (`CurrentUserContext`) para compartilhamento de estado do usuário logado

### Backend
- Node.js 24.x
- Express 5
- MongoDB + Mongoose (ODM)
- JSON Web Token (JWT) para autenticação
- bcryptjs para hash de senhas
- celebrate / Joi para validação de schemas de requisição
- cors, configurado para aceitar apenas os domínios de produção do frontend
- dotenv para variáveis de ambiente

### Infraestrutura e deploy
- **Google Cloud Compute Engine** (VM `e2-micro`, provisionamento Standard, Debian, `us-central1-a`)
- **MongoDB 8.0** (repositório `bookworm`, pois o Debian 13/trixie ainda não possui pacote oficial)
- **Nginx** como reverse proxy (porta 80 direcionando para a porta 3000)
- **PM2** para gerenciamento do processo Node.js em produção, com persistência via `pm2 startup` / `pm2 save`
- **UFW** (firewall) liberando apenas as portas 22, 80 e 443
- **1GB de swap** configurado para contornar a limitação de RAM da instância `e2-micro`
- **FreeDNS** para o gerenciamento do domínio
- **Certbot / Let's Encrypt** para emissão dos certificados SSL

---

## 🌐 Domínios

| Serviço | Domínio |
|---|---|
| Frontend | `flp-around-us.verymad.net` |
| Frontend (www) | `www.flp-around-us.verymad.net` |
| Backend / API | `api.flp-around-us.verymad.net` |

Todos os domínios possuem certificado SSL válido emitido via Let's Encrypt, garantindo acesso via HTTPS.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js 24.x
- MongoDB instalado e rodando localmente (`mongodb://localhost:27017/aroundb`)

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```
JWT_SECRET=<sua_chave_secreta_em_hexadecimal>
NODE_ENV=development
PORT=3000
```

Para rodar em modo desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

Para rodar em modo produção:

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite), consumindo a API local em `http://localhost:3000`.

---

## 📁 Estrutura do repositório

```
web_project_api_full/
├── backend/
│   ├── controllers/
│   ├── logs/
│   ├── middlewares/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── .editorconfig
│   ├── .env
│   ├── .eslintrc
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
└── frontend/
    ├── blocks/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Footer/
    │   │   ├── Header/
    │   │   ├── Login/
    │   │   ├── Main/
    │   │   ├── ProtectedRoute/
    │   │   ├── Register/
    │   │   └── App.jsx
    │   ├── contexts/
    │   ├── utils/
    │   ├── index.css
    │   └── main.jsx
    ├── vendor/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

---

## ✍️ Autor

**Felipe Carvalho**

- GitHub: [github.com/flpzht](https://github.com/flpzht)
- LinkedIn: [linkedin.com/in/felipecarvalhodesouzabarros](https://linkedin.com/in/felipecarvalhodesouzabarros)

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins de aprendizado no bootcamp da TripleTen.