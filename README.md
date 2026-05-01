# Telegram Bot Solo

Um bot completo para Telegram com diversos comandos úteis, desenvolvido em Node.js usando Telegraf v4.

## Funcionalidades

### 🛠️ DEV & PROGRAMAÇÃO
- `/npm <pacote>` - Busca informações de pacotes NPM
- `/py <pacote>` - Busca informações de pacotes PyPI
- `/gh <usuario/repo>` - Informações de repositórios GitHub
- `/ghuser <username>` - Perfil de usuários GitHub
- `/mdn <termo>` - Link para documentação MDN
- `/caniuse <feature>` - Suporte de features no Can I Use
- `/color <hex>` - Conversão de cores hex para RGB/HSL
- `/regex <padrão>` - Explicação de expressões regulares

### 🎬 MÍDIA & DOWNLOAD
- `/video <link>` - Download de vídeos (YouTube, TikTok, etc.)
- `/audio <link>` - Extração de áudio MP3
- `/thumbnail <link>` - Thumbnail de vídeos YouTube

### 🌐 REDES SOCIAIS & PERFIS
- `/instagram <usuario>` - Screenshot de perfis Instagram
- `/roblox <usuario>` - Informações de perfis Roblox
- `/steam <vanityURL>` - Informações de perfis Steam

### 🔧 FERRAMENTAS & UTILIDADES
- `/ip` - Seu IP e localização geográfica
- `/ping <host>` - Teste de conectividade HTTP
- `/hash <texto>` - Geração de hashes MD5/SHA256/SHA512
- `/b64 <texto>` - Codificação Base64
- `/b64d <texto>` - Decodificação Base64
- `/encurtar <url>` - Encurtamento de URLs
- `/expandir <url>` - Expansão de URLs encurtadas
- `/qr <texto>` - Geração de QR Codes
- `/calc <expressão>` - Calculadora matemática
- `/uuid` - Geração de UUID v4
- `/password <tamanho>` - Geração de senhas seguras
- `/whois <dominio>` - Consulta WHOIS
- `/timestamp` - Timestamps atuais

### 🎮 GAMES & DIVERSÃO
- `/dado <NdN>` - Rolagem de dados RPG
- `/moeda` - Cara ou coroa
- `/8ball <pergunta>` - Bola 8 mágica
- `/piada` - Piadas aleatórias
- `/curiosidade` - Curiosidades aleatórias
- `/quote` - Citações famosas
- `/sorte` - Números da sorte (mega-sena)

### 📈 FINANÇAS & MERCADO
- `/btc` - Preço do Bitcoin
- `/eth` - Preço do Ethereum
- `/crypto <symbol>` - Preços de criptomoedas
- `/dolar` - Cotação do dólar
- `/euro` - Cotação do euro

### 🌍 INFO & CLIMA
- `/tempo <cidade>` - Clima atual
- `/trending` - Repositórios GitHub em alta
- `/news` - Notícias do Hacker News
- `/pais <nome>` - Informações de países
- `/fuso <cidade>` - Hora atual em diferentes fusos
- `/feed` - Iniciar feed automático de mensagens
- `/parar` - Parar feed automático

## Pré-requisitos

- Node.js 18+ LTS
- yt-dlp instalado no sistema
- Token do Bot Telegram (obtenha em @BotFather)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo>
   cd telegram-bot-solo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o token:
   ```bash
   cp .env.example .env
   nano .env  # Cole seu BOT_TOKEN
   ```

4. Instale yt-dlp:
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install yt-dlp

   # macOS
   brew install yt-dlp

   # Ou manualmente
   curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
   chmod +x /usr/local/bin/yt-dlp
   ```

5. Execute o bot:
   ```bash
   npm start
   ```

   Ou para desenvolvimento:
   ```bash
   npm run dev
   ```

## Deploy

### Railway
1. Conecte seu repositório Git
2. Adicione a variável `BOT_TOKEN` no painel
3. Defina o comando start: `npm start`

### Render
1. Crie um Web Service
2. Conecte o repositório
3. Defina o comando start: `npm start`
4. Adicione a variável `BOT_TOKEN`

### VPS
1. Faça upload dos arquivos
2. Instale Node.js e yt-dlp
3. Use PM2 para gerenciar:
   ```bash
   npm install -g pm2
   pm2 start index.js --name bot
   pm2 save
   pm2 startup
   ```

## Estrutura do Projeto

```
telegram-bot-solo/
├── index.js              # Arquivo principal
├── package.json          # Dependências
├── .env                  # Token do bot (não commitar)
├── .env.example          # Exemplo de configuração
├── .gitignore            # Arquivos ignorados
├── README.md             # Documentação
├── commands/             # Comandos organizados por categoria
│   ├── dev.js
│   ├── media.js
│   ├── social.js
│   ├── tools.js
│   ├── games.js
│   ├── crypto.js
│   └── info.js
├── services/             # Serviços auxiliares
│   ├── feed.service.js
│   ├── downloader.service.js
│   └── cache.service.js
└── utils/                # Utilitários
    ├── formatter.js
    └── logger.js
```

## Tratamento de Erros

- Todos os comandos incluem try/catch
- Timeouts padrão de 15 segundos para APIs
- Mensagens de erro amigáveis em português
- Validação de argumentos obrigatórios

## APIs Utilizadas

- NPM Registry API
- PyPI JSON API
- GitHub API (pública)
- IPify & IPAPI
- TinyURL
- CoinGecko (sem key)
- AwesomeAPI
- Open-Meteo
- RestCountries
- QR Server
- Thum.io (screenshots)

## Desenvolvimento

Para contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## Licença

Este projeto é open source e gratuito.

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.
