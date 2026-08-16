# 🛒 Gerenciador de Vendas — Guia Passo a Passo para Executar

Bem-vindo ao **Gerenciador de Vendas**! 🚀  
Este guia foi criado especialmente para você que **não tem experiência com programação** e deseja executar o projeto ou gerar um aplicativo instalável no seu computador Windows.

---

## 📌 Sumário

1. [O que é este projeto?](#-o-que-é-este-projeto)
2. [Pré-requisitos (O que instalar antes)](#-pré-requisitos-o-que-instalar-antes)
3. [Passo a Passo para Executar o Projeto](#-passo-a-passo-para-executar-o-projeto)
   - [Passo 1: Abrir a pasta no Terminal](#passo-1-abrir-a-pasta-no-terminal)
   - [Passo 2: Instalar os componentes](#passo-2-instalar-os-componentes)
   - [Passo 3: Criar o Banco de Dados](#passo-3-criar-o-banco-de-dados)
   - [Passo 4: Iniciar o Aplicativo](#passo-4-iniciar-o-aplicativo)
4. [Gerar o Aplicativo Instalável (.exe para Windows)](#-gerar-o-aplicativo-instalável-exe-para-windows)
5. [Como visualizar os dados salvos (Prisma Studio)](#-como-visualizar-os-dados-salvos-prisma-studio)
6. [Resumo dos Comandos](#-resumo-dos-comandos)
7. [Solução de Problemas Comuns](#-solução-de-problemas-comuns)

---

## 💡 O que é este projeto?

O **Gerenciador de Vendas** é um aplicativo desktop para computador que ajuda a controlar vendas, produtos e clientes.

Foi desenvolvido utilizando tecnologias modernas:
- **Interface Visual (Frontend):** Angular
- **Servidor Interno (Backend):** NestJS
- **Janela do Aplicativo Desktop:** Electron
- **Banco de Dados Local:** SQLite (Prisma)

---

## 💻 Pré-requisitos (O que instalar antes)

Para rodar este projeto, você só precisa de **uma ferramenta essencial** instalada no seu computador: o **Node.js**.

### 1️⃣ Baixar e Instalar o Node.js

O Node.js é o "motor" que vai executar o projeto.

1. Acesse o site oficial: [https://nodejs.org/](https://nodejs.org/)
2. Clique no botão verde de download da versão **LTS** (Exemplo: `v20.x` ou `v22.x` — a versão recomendada para a maioria dos usuários).
3. Abra o arquivo baixado e instale avançando as telas (pode clicar em *Next/Avançar* em todas as opções padrão).
4. **IMPORTANTE:** Após a instalação terminar, **reinicie o seu computador** ou feche e reabra qualquer janela do terminal/código.

> [!TIP]
> **Como testar se o Node.js foi instalado corretamente?**  
> Abra o *Prompt de Comando* (CMD) ou *PowerShell* e digite:
> ```bash
> node -v
> ```
> Se aparecer um número de versão (ex: `v20.18.0`), significa que está tudo pronto!

---

## 🛠️ Passo a Passo para Executar o Projeto

Siga os 4 passos abaixo na ordem em que aparecem.

### Passo 1: Abrir a pasta no Terminal

Se você estiver usando o **VS Code** (Visual Studio Code):
1. Abra a pasta do projeto no VS Code (`Arquivo` > `Abrir Pasta...`).
2. No menu superior, clique em **Terminal** > **Novo Terminal** (ou pressione a atalho `Ctrl` + `'`).
3. Uma barra preta ou azul vai se abrir na parte inferior da tela. Esse é o seu terminal.

Se estiver usando o **Windows Explorer** tradicional:
1. Abra a pasta do projeto no Windows.
2. Clique na barra de endereço na parte superior da pasta, digite `cmd` e aperte `Enter`.

---

### Passo 2: Instalar os componentes

No terminal, digite o comando abaixo e pressione `Enter`:

```bash
npm install
```

⏳ **O que isso faz?**  
Ele vai baixar automaticamente todas as dependências e ferramentas que o projeto precisa para funcionar. Esse processo pode levar entre 1 a 3 minutos dependendo da sua velocidade de internet. Aguarde até que o terminal termine e volte a ficar disponível.

---

### Passo 3: Criar o Banco de Dados

O aplicativo precisa de um banco de dados local para salvar as informações de vendas e produtos.

Execute os dois comandos a seguir, um por vez:

1. Gerar os arquivos do banco de dados:
   ```bash
   npm run prisma:generate
   ```

2. Criar a estrutura das tabelas de dados:
   ```bash
   npm run prisma:migrate
   ```

> [!NOTE]
> Ao rodar o `prisma:migrate`, ele irá criar automaticamente um arquivo chamado `dev.db` na raiz da pasta. Esse arquivo guarda todas as informações cadastradas no sistema.

---

### Passo 4: Iniciar o Aplicativo

Agora é só dar o comando para ligar tudo! Digite no terminal:

```bash
npm run dev
```

🚀 **O que acontece agora?**
1. O backend (servidor) vai iniciar.
2. O frontend (interface) vai compilar.
3. Em alguns segundos, a **janela do aplicativo Gerenciador de Vendas abrirá automaticamente** na sua tela!

> 💡 **Para fechar o programa durante o desenvolvimento:**  
> Basta fechar a janela do aplicativo ou clicar na janela do terminal e pressionar as teclas `Ctrl` + `C` para encerrar os processos.


## 📊 Como visualizar os dados salvos (Prisma Studio)

Se você quiser ver, adicionar ou editar diretamente os dados cadastrados no banco de dados de forma visual e simples sem abrir o app:

No terminal, digite:

```bash
npm run prisma:studio
```

Uma página no seu navegador da Web será aberta automaticamente (no endereço `http://localhost:5555`).  
Lá você terá uma tabela visual fácil para consultar tudo o que está salvo no sistema.

---

## 📋 Resumo dos Comandos

Aqui está uma tabela rápida de referência:

| Ação desejada | Comando a digitar no terminal |
| :--- | :--- |
| **Instalar ferramentas iniciais** | `npm install` |
| **Iniciar o aplicativo (Modo de Teste)** | `npm run dev` |
| **Gerar banco de dados** | `npm run prisma:migrate` |
| **Visualizar o banco de dados no navegador** | `npm run prisma:studio` |

---

## ❓ Solução de Problemas Comuns

### 1. `O comando 'npm' não é reconhecido...`
- **Causa:** O Node.js não foi instalado ou o terminal estava aberto durante a instalação.
- **Solução:** Feche o terminal/VS Code, reinstale o Node.js se necessário e reabra o terminal.

### 2. `Erro de Execução de Scripts no PowerShell (PSSecurityException)`
- **Causa:** O Windows bloqueia por padrão a execução de scripts no PowerShell.
- **Solução:** No terminal do VS Code, clique na setinha ao lado do ícone `+` no canto do terminal e escolha **Command Prompt** (CMD) em vez do PowerShell.

### 3. `Porta 4200 ou 3000 já está em uso`
- **Causa:** O aplicativo já está rodando em outra janela do terminal ou ficou preso em segundo plano.
- **Solução:** Feche todas as janelas do terminal ou reinicie o computador para liberar a porta.

### 4. Quero zerar o banco de dados e começar do zero
- **Solução:** Digite `npm run prisma:reset` no terminal e confirme. Isso limpa todos os dados de teste.

---

✨ **Pronto!** Agora você tem tudo o que precisa para rodar e utilizar o seu Gerenciador de Vendas. Bom uso!
