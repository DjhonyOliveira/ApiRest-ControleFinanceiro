# API de Gerenciamento Financeiro
### Esta API oferece operações CRUD (Create, Read, Update, Delete) para gerenciamento de metas financeiras, usuários, transações e categorias, seguindo os princípios REST.

## 📋 Endpoints Base

### Recurso	Endpoint
- Metas	    http://localhost/POO/Api/meta/
- Usuários	http://localhost/POO/Api/usuario/
- Transações	http://localhost/POO/Api/transacao/
- Categorias	http://localhost/POO/Api/categoria/

## 🛠 Operações Suportadas
Todos os endpoints suportam os seguintes métodos:

| Método  | Descrição                     | Exemplo de Uso                   |
|:-------:|:-----------------------------:|:--------------------------------:|
| 🔍 GET     | Recupera recursos             | `GET /meta/` (lista todas)       |
| ➕ POST    | Cria novo recurso             | `POST /usuario/` (novo usuário)  |
| ✏️ PUT     | Atualiza recurso existente    | `PUT /transacao/1` (atualiza ID 1) |
| ❌ DELETE  | Remove recurso                | `DELETE /categoria/3` (remove ID 3) |

## 📚 Documentação dos Recursos
1. Metas (/meta/)
- Gerencia objetivos financeiros dos usuários

Estrutura de Dados:

```json
{
  "id": "int",
  "descricao": "string",
  "valor_alvo": "float",
  "data_limite": "date",
  "usuario": "int"
}
```

2. Usuários (/usuario/)
- Administra os usuários do sistema

Estrutura de Dados:

```json
{
  "id": "int",
  "nome": "string",
  "email": "string",
}
```

3. Transações (/transacao/)
- Registra movimentações financeiras

Estrutura de Dados:

```json
{
  "id": "int",
  "valor": "float",
  "descricao": "string",
  "data": "date",
  "categoria": "int",
  "usuario": "int"
}
```

4. Categorias (/categoria/)
- Classifica as transações financeiras

Estrutura de Dados:

```json
{
  "id": "int",
  "nome": "string",
  "tipo": "string"
}
```

## ⚙️ Requisitos Técnicos
- Servidor web (Apache)
- PHP 8.0 ou superior
- Banco de dados PostgreSQL
- Extensão PDO para PHP
- Composer para gerenciamento de dependencias

## 🚀 Instalação
Clone o repositório:

```bash
git clone https://github.com/DjhonyOliveira/ApiRest-ControleFinanceiro.git POO
```

- Configure o banco de dados:
 Dentro do diretorio API/ existe a pasta db, basta copiar o script sql e executar em seu sgdb

Crie um arquivo .env e Ajuste as credenciais para conexão com seu banco de dados com base no arquivo .env.example presente na raiz do projeto

Com tudo instalado ok, necessário executar a instalação do composer para gerenciamento do autoload das class, dentro do diretório princiapal, execute:

```bash
composer install
```

Utilizando insomnia, postman, etc, execute as requisições conforme citado a cima.