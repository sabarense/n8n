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

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Guia de Instalação

Como todo o ambiente é containerizado, a instalação é rápida e simples. Siga os passos abaixo:

### 1️⃣ Clonar o Repositório

Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/sabarense/n8n.git
cd n8n
```
---

### 2️⃣ Construa a Imagem Customizada

Este comando irá construir a imagem Docker do n8n, incluindo quaisquer nodes customizados que você tenha adicionado ao projeto.
```bash
docker compose build
```

---

### 3️⃣ Inicie os Serviços

Agora, suba os contêineres do n8n e do Postgres em modo "detached" (em segundo plano).

```bash
docker compose up -d
```
---

Após a inicialização, a interface do n8n estará disponível em:  
**[http://localhost:5678](http://localhost:5678)**

Na primeira vez que acessar, você precisará configurar uma conta de administrador (owner) para o n8n.

---

## 🧪 Executando os Testes

O método recomendado para testar o node é a **validação manual** diretamente na interface do n8n, que permite verificar tanto os casos de sucesso quanto as falhas controladas.

### Teste de Funcionalidade Principal (Números Válidos)

Este teste valida a funcionalidade principal do node.

1.  Acesse sua instância local do n8n em [http://localhost:5678](http://localhost:5678)
2.  Crie um novo workflow
3.  Adicione o node **"Random"**
4.  Configure os parâmetros `Min` e `Max` com um intervalo válido (ex: `Min: 1`, `Max: 100`)
5.  Clique em **"Execute Node"**
6.  **Resultado esperado:** O painel **Output** deve conter:
   ```json
   {
     "randomNumber": 42
   }
   ```
   Onde `42` é um número inteiro dentro do intervalo 1-100.

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
2. Reconstrua a imagem:

```bash
docker compose build
```

3. Reinicie os serviços, se necessário:

```bash
docker compose up -d
```
---

## 📂 Estrutura do Projeto

```
.
├── nodes/Random/
│   ├── Random.node.ts        # Código-fonte do node customizado
│   ├── Random.node.json      # Configurações do node
│   └── icon.node.svg         # Ícone do node (corrigido)
├── init-data.sh              # Script de inicialização
├── .env                      # Variáveis de ambiente (criar manualmente)
├── docker-compose.yaml       # Orquestração dos serviços
├── Dockerfile                # Imagem customizada do n8n
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
├── gulpfile.js               # Tasks de build
├── index.js                  # Ponto de entrada
├── LICENSE.md                # Licença do projeto
└── README.md                 # Documentação
```

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.
