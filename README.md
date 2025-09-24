# Node Customizado n8n: Random.org

![n8n](https://img.shields.io/badge/n8n-Custom_Node-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)

Este projeto contém um node customizado para o n8n que gera números aleatórios verdadeiros, integrando-se diretamente com a API pública do [Random.org](https://www.random.org/).

O ambiente de desenvolvimento e execução é totalmente gerenciado com **Docker** e **Docker Compose**, utilizando um banco de dados **PostgreSQL** para persistência de dados do n8n.

---

## 🔧 Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (v16 ou superior) e npm  
- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para configurar e executar o ambiente localmente.

### 1️⃣ Clonar o Repositório

Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/sabarense/n8n.git
cd n8n
```

---

### 2️⃣ Configurar o Ambiente

As configurações do banco de dados e do n8n são gerenciadas por variáveis de ambiente.

Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo (substitua os valores de exemplo por senhas seguras):

```env
# Variáveis para o Banco de Dados PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=sua_senha_forte_aqui
POSTGRES_DB=n8n
POSTGRES_NON_ROOT_USER=n8n_user
POSTGRES_NON_ROOT_PASSWORD=outra_senha_forte_aqui

# As variáveis abaixo são usadas pelo n8n, mas já são lidas
# do docker-compose.yml, então não precisam ser repetidas aqui.
```

---

### 3️⃣ Instalar as Dependências

Instale as dependências necessárias para o desenvolvimento do node:

```bash
npm install
```

---

### 4️⃣ Compilar o Node Customizado

Compile o código TypeScript para JavaScript:

```bash
npm run build
```

Os arquivos compilados serão gerados no diretório `dist/`.

---

### 5️⃣ Executar o Serviço com Docker

Inicie o n8n e o banco de dados com:

```bash
docker compose up -d
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Após a inicialização, a interface do n8n estará disponível em:  
**[http://localhost:5678](http://localhost:5678)**

Para verificar se o node foi carregado corretamente, crie um novo workflow e procure por **"Random"** na lista de nodes.

---

## 🧪 Executando os Testes

O método recomendado para testar nodes customizados é o **teste manual** diretamente na interface do n8n:

1. Acesse sua instância local do n8n  
2. Crie um novo workflow  
3. Adicione o node **"Random"**  
4. Configure os parâmetros **Min** e **Max**  
5. Clique em **"Execute Node"**  
6. Verifique se o resultado no painel **Output** contém um número dentro do intervalo esperado na chave `randomNumber`

---

## 🔄 Ciclo de Desenvolvimento

Quando fizer alterações no código-fonte (`Random.node.ts`), siga estes passos:

1. Modifique o código conforme necessário  
2. Recompile o node:

```bash
npm run build
```

3. Reinicie o container do n8n para recarregar os nodes customizados:

```bash
docker compose restart n8n
```

(O banco de dados não será afetado.)

---

## 📂 Estrutura do Projeto

```
.
├── nodes/Random
│   ├── Random.node.ts    # Código-fonte do node
│   └── Random.svg        # Ícone do node
├── dist/                 # Código compilado (gerado pelo `npm run build`)
├── .env                  # Variáveis de ambiente 
├── docker-compose.yml    # Define os serviços do n8n e postgres
├── package.json          # Dependências e scripts do projeto
└── README.md            
```

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.
