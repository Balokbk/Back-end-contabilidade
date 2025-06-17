# Back-End Contabilidade
API para o gerenciamento de usuários, contas e transações financeiras.

## Tecnologias
- Node.js
- Express
- MySQL
- Sequelize
- JWT

## Instalação
1. Clone o repositório:
```sh
git clone https://github.com/Balokbk/Back-end-contabilidade
```

2. Instale as dependências:
```sh
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo chamado `.env` na raiz do projeto com os seguintes campos, lembrando que o banco de dados será o MySQL:
```sh
DB_USERNAME = "(Nome de usuário do DB)"
DB_PASSWORD = "(Senha desse usuário)"
DB_DATABASE = "(Nome do banco de dados)"
DB_HOST = "(IP do host, geralmente 127.0.0.1)"
DB_DIALECT = "mysql"
JWT_SECRET = "(Segredo da jwt, pode ser o que quiser)"
```

4. Inicie o banco de dados:
```sh
npm run db:init
```

5. Rode o projeto:
```sh
npm run server
```

## Rotas

### Usuário:
| Método | Rota | Autenticação | Descrição                        |
|--------|------------------------|--------------|----------------------------------|
| POST   | /users/create          | Não          | Cria um novo usuário             |
| POST   | /users/login           | Não          | Realiza login e retorna token    |
| GET    | /users/me              | Sim          | Retorna dados do usuário logado  |
| PUT    | /users/me              | Sim          | Atualiza dados do usuário logado |
| DELETE | /users/me              | Sim          | Deleta o usuário logado          |

- Exemplo de `POST` na rota `/users/create`:
```json
{
    "username": "nome_de_usuario",
    "email": "usuario@exemplo.com",
    "password": "senha_segura",
    "balance": 100.00 // Este campo é opcional, se você quiser definir um saldo inicial
}
```
Retornando `201`, `409` e `500`:  

Resposta do sucesso `201`:  
```json
{
    "message": "Registro criado com sucesso",
    "UserEmail": "usuario@exemplo.com",
    "AccountId": 1,
    "AccountUserId": 1,
    "AccountBalance": 100
}
```
Resposta do erro `409`:  
```json
{
    "message": "Email já cadastrado"
}
```

- Exemplo de `POST` na rota `/users/login`:
```json
{
    "email": "usuario@exemplo.com",
    "password": "senha_segura"
}
```
Retornando `200`, `401` e `500`:  

Resposta do sucesso `200`:
```json
{
    "message": "Login bem sucedido",
    "token": "<token>"
}
```
Lembrando, o token tem que ser armazenado no local storage como `Authorization: Bearer <token>` (Lembrando, todas as rotas protegidas necessitam do token)  

Resposta do erro `401`:
```json
{
    "message": "Email ou senha incorretos"
}
```

- Retorno de `GET` na rota `/users/me` (Lembrando, apenas funciona com o token de sessão):
```json
{
  "user": {
    "user_id": 1,
    "username": "nome_de_usuario",
    "email": "usuario@exemplo.com"
  },
  "account": {
    "account_id": 1,
    "user_id": 1,
    "balance": 100
  }
}
```
O `POST` apenas necessita dum corpo JSON com as informações dos campos que serão alterados. Já o `DELETE` pega o token de sessão para achar o usuário e deletá-lo.

### Transação:

| Método | Rota                      | Autenticação | Descrição                                      | Body/Parâmetros                |
|--------|---------------------------|--------------|------------------------------------------------|--------------------------------|
| GET    | /transactions/accounts    | Sim          | Lista todas as transações da conta do usuário   | —                              |
| GET    | /transactions/:id         | Sim          | Detalha uma transação específica pelo ID        | Parâmetro de rota: `id`        |
| POST   | /transactions             | Sim          | Realiza uma nova transação                      | `toAccount`, `amount` no body  |

(Lembrando, todas as rotas de transaçòes necessitam do token para achar o usuário)
- Retorno do `GET` na rota '/transaction/accounts' (Retorna um array com todas as transações no id da conta da pessoa). Exemplo:
```json
[
  {
    "transaction_id": 1,
    "account_id": 1,
    "type": "income",
    "amount": 200,
    "description": "Salário",
    "transaction_date": "2025-06-16T12:00:00.000Z",
    "createdAt": "2025-06-16T12:00:00.000Z"
  },
  {
    "transaction_id": 2,
    "account_id": 1,
    "type": "expense",
    "amount": 50,
    "description": "Supermercado",
    "transaction_date": "2025-06-15T18:30:00.000Z",
    "createdAt": "2025-06-15T18:30:00.000Z"
  }
]
```

 O campo `type` (Obrigatório preencher) aceita apenas dois tipos de entradas, 'income' ou 'expense' (income = entrada, expense = saída).  
 O campo `amount` (Obrigatório preencher) aceita apenas dados do tipo inteiro ou decimais.
 O campo `description` (Opcional) aceita dados do tipo String.
 O campo `transaction_date` (Opcional) aceita apenas dados do tipo Date('YYYY-MM-DD', ou data e hora completas).

- Retorno de `GET` na rota '/transactions/:id' (Retorna uma transação específica pelo ID):
```json
{
  "transaction_id": 2,
  "account_id": 1,
  "type": "expense",
  "amount": 50,
  "description": "Supermercado",
  "transaction_date": "2025-06-15T18:30:00.000Z",
  "createdAt": "2025-06-15T18:30:00.000Z"
}
```
Caso não encontre o ID, retornará:
```json
{
  "Message": "Registro não encontrado"
}
```

- Exemplo de `POST` na rota '/transactions':
```json
{
  "type": "income",
  "amount": 250.00,
  "description": "Pagamento de serviço",
  "transaction_date": "2000-01-01"
}
```