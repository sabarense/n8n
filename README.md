# Node Customizado n8n: Random.org

![n8n](https://img.shields.io/badge/n8n-Custom_Node-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

Este projeto contém um node customizado para o n8n que gera números aleatórios verdadeiros, integrando-se diretamente com a API pública do [Random.org](https://www.random.org/).

O ambiente de desenvolvimento e execução é totalmente gerenciado com **Docker** e **Docker Compose**, utilizando um banco de dados **PostgreSQL** para persistência de dados do n8n.

---

## ✨ Funcionalidades

- **Geração de Números Aleatórios Reais:** Utiliza a API do `Random.org` para garantir aleatoriedade de alta qualidade.
- **Configuração Simples:** Interface intuitiva com apenas dois parâmetros: `Min` e `Max`.
- **Tratamento de Erros Robusto:** Camada tripla de validação para garantir que os parâmetros são existentes, do tipo correto e lógicos.
- **Ambiente Dockerizado:** Configuração de ambiente local com um único comando (`docker compose up`).

---

## 🔧 Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (v16 ou superior) e npm
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Guia de Instalação

Siga os passos abaixo para configurar o ambiente localmente.

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

O método recomendado para testar o node é a **validação manual** diretamente na interface do n8n, que permite verificar tanto os casos de sucesso quanto as falhas controladas.


Este teste valida a funcionalidade principal do node.

1.  Acesse sua instância local do n8n.
2.  Crie um novo workflow.
3.  Adicione o node **"Random"**.
4.  Configure os parâmetros `Min` e `Max` com um intervalo válido (ex: `Min: 1`, `Max: 100`).
5.  Clique em **"Execute Node"**.
6.  Verifique se o resultado no painel **Output** contém a chave `randomNumber` com um número inteiro dentro do intervalo esperado.

### Testes de Validação e Erros

O node possui uma camada tripla de validação para garantir a integridade dos dados antes de chamar a API externa. É importante testar esses cenários para confirmar que as mensagens de erro são exibidas corretamente:

1.  **Teste de Lógica (Intervalo Inválido):**
    * Configure `Min` com um valor **maior ou igual** a `Max` (ex: `Min: 50`, `Max: 20`).
    * Execute o node e verifique se a mensagem de erro: *"O valor de "Max" deve ser estritamente maior que o valor de "Min".* é exibida.

2.  **Teste de Tipo (Número não Inteiro):**
    * Utilize uma expressão para inserir um número decimal em um dos campos (ex: `{{ 10.5 }}`).
    * Execute e verifique se a mensagem de erro: *"Os valores de "Min" e "Max" devem ser inteiros."* é exibida.

3.  **Teste de Existência (Valor Nulo):**
    * Utilize uma expressão que resulte em um valor nulo (ex: `{{ $json.valorInexistente }}`).
    * Execute e confirme se a mensagem de erro sobre parâmetros obrigatórios é mostrada.

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
