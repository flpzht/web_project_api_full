# Around the U.S. — Frontend com Autenticação

Aplicação React desenvolvida como parte do projeto Around the U.S. (EUA Afora). A aplicação permite que usuários se registrem, façam login e interajam com cards de localidades dos Estados Unidos, com suporte a curtidas, exclusão e edição de perfil.

## Funcionalidades

### Autenticação

* Registro de novos usuários
* Login com email e senha
* Logout com remoção de token
* Verificação de sessão via JWT no localStorage
* Rotas protegidas por autenticação
* Redirecionamento automático baseado no estado de login

### Perfil

* Exibição de nome, descrição e avatar do usuário
* Edição de informações do perfil
* Atualização de avatar

### Cards

* Listagem de cards cadastrados
* Criação de novos cards com nome e link de imagem
* Exclusão de cards
* Sistema de curtidas

### Feedback Visual

* InfoTooltip com mensagem de sucesso ou erro após operações
* Popups para edição de perfil, avatar e criação de cards

## Tecnologias

* React
* React Router DOM
* Vite
* JavaScript (ES6+)
* CSS3

## Estrutura do Projeto

```text
web_project_around_auth/
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── eslint.config.js
├── README.md
├── vendor
│   ├── fonts
│   ├── fonts.css
│   └── normalize.css
├── images/
├── blocks/
│   ├── header.css
│   ├── footer.css
│   ├── card.css
│   ├── cards.css
│   ├── content.css
│   ├── infoTooltip.css
│   ├── login.css
│   ├── page.css
│   ├── popup.css
│   ├── profile.css
│   └── register.css
└── src/
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── App.jsx
    │   ├── Header/
    │   │   └── Header.jsx
    │   ├── Main/
    │   │   ├── Main.jsx
    │   │   └── components/
    │   │       ├── Card/
    │   │       │   └── Card.jsx
    │   │       ├── ImagePopup/
    │   │       │   └── ImagePopup.jsx
    │   │       └── Popup/
    │   │           └── components/
    │   │               ├── EditAvatar/
    │   │               │   └── EditAvatar.jsx
    │   │               ├── EditProfile/
    │   │               │   └── EditProfile.jsx
    │   │               ├── InfoTooltip/
    │   │               │   └── InfoTooltip.jsx
    │   │               ├── NewCard/
    │   │               │   └── NewCard.jsx
    │   │               └── RemoveCard/
    │   │                   └── RemoveCard.jsx
    │   ├── Footer/
    │   │   └── Footer.jsx
    │   ├── Login/
    │   │   └── Login.jsx
    │   ├── Register/
    │   │   └── Register.jsx
    │   └── ProtectedRoute/
    │       └── ProtectedRoute.jsx
    ├── contexts/
    │   └── CurrentUserContext.js
    └── utils/
        ├── api.js
        ├── auth.js
        └── token.js
```

## APIs Utilizadas

### Around API — Perfil e Cards

```text
https://around-api.pt-br.tripleten-services.com/v1
```

Responsável por usuários, cards e curtidas.

### Auth API — Autenticação

```text
https://se-register-api.en.tripleten-services.com/v1
```

Responsável por registro, login e verificação de token.

## Rotas da Aplicação

| Rota | Descrição | Proteção |
| --- | --- | --- |
| /signin | Página de login | Anônima |
| /signup | Página de registro | Anônima |
| /profile | Página principal com cards e perfil | Autenticada |

## Autenticação

O token JWT é armazenado no `localStorage` e verificado a cada montagem da aplicação. Rotas protegidas redirecionam para `/signin` caso o token seja inválido ou inexistente.

```javascript
// Verificação de sessão
const jwt = getToken();
auth.checkToken(jwt).then((userData) => {
  setUserData({ email: userData.email });
  setIsLoggedIn(true);
});
```

## Modelos de Dados

### Usuário

| Campo  | Descrição              |
| ------ | ---------------------- |
| name   | Nome do usuário        |
| about  | Descrição do usuário   |
| avatar | URL do avatar          |
| email  | Email de autenticação  |

### Card

| Campo     | Descrição                  |
| --------- | -------------------------- |
| name      | Nome do local              |
| link      | URL da imagem              |
| owner     | ID do dono do card         |
| likes     | Lista de IDs de curtidas   |
| createdAt | Data de criação            |

## Instalação

### Clone o repositório

```bash
git clone <url-do-repositorio>
cd web_project_around_auth
```

### Instale as dependências

```bash
npm install
```

### Inicie a aplicação

Modo desenvolvimento:

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

## Tratamento de Erros

### Login inválido

Exibe o `InfoTooltip` com mensagem de falha:

```text
Ops, algo deu errado. Por favor, tente novamente.
```

### Registro bem-sucedido

Redireciona para `/signin` automaticamente após o cadastro.

### Token inválido ou expirado

Redireciona para `/signin` e limpa o token do localStorage.


## 🔗 Deploy

🌐 Acesse o projeto: **[flpzht.github.io/web_project_around_auth](https://flpzht.github.io/web_project_around_auth/)**

---

## 👤 Autor

**Felipe Barros**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](www.linkedin.com/in/felipecarvalhodesouzabarros)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/flpzht)