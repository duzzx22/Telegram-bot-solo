const axios = require('axios');
const crypto = require('crypto');

module.exports = (bot) => {
  // /start
  bot.start((ctx) => {
    const name = ctx.from.first_name || 'Usuário';
    ctx.reply(`Olá, ${name}! Bem-vindo ao bot. Use /help para ver os comandos disponíveis.`, { parse_mode: 'Markdown' });
  });

  // /help
  bot.help(async (ctx) => {
    await ctx.replyWithAnimation('https://media.giphy.com/media/MeEi8ksUsV56Wa2NZl/giphy.gif');
    const helpText = `
*── 🛠️ DEV & PROGRAMAÇÃO ──────────────────*

*/npm <pacote>* - Info do pacote NPM
*/py <pacote>* - Info do pacote PyPI
*/gh <usuario/repo>* - Info do repositório GitHub
*/ghuser <username>* - Info do usuário GitHub
*/mdn <termo>* - Link MDN
*/caniuse <feature>* - Link Can I Use
*/color <hex>* - Converter cor hex para RGB/HSL
*/regex <padrão>* - Explicar regex

*── 🎬 MÍDIA & DOWNLOAD ───────────────────*

*/video <link>* - Baixar vídeo
*/audio <link>* - Extrair áudio MP3
*/thumbnail <link>* - Thumbnail do vídeo

*── 🌐 REDES SOCIAIS & PERFIS ─────────────*

*/instagram <usuario>* - Screenshot do perfil Instagram
*/roblox <usuario>* - Info do perfil Roblox
*/steam <vanityURL>* - Info do perfil Steam

*── 🔧 FERRAMENTAS & UTILIDADES ───────────*

*/ip* - Seu IP e localização
*/ping <host>* - Ping HTTP
*/hash <texto>* - Hashes MD5/SHA256/SHA512
*/b64 <texto>* - Codificar Base64
*/b64d <texto>* - Decodificar Base64
*/encurtar <url>* - Encurtar URL
*/expandir <url>* - Expandir URL encurtada
*/qr <texto>* - Gerar QR Code
*/calc <expressão>* - Calculadora
*/uuid* - Gerar UUID v4
*/password <tamanho>* - Gerar senha
*/whois <dominio>* - Link WHOIS
*/timestamp* - Timestamp atual

*── 🎮 GAMES & DIVERSÃO ───────────────────*

*/dado <NdN>* - Rolar dados RPG
*/moeda* - Cara ou coroa
*/8ball <pergunta>* - Bola 8 mágica
*/piada* - Piada aleatória
*/curiosidade* - Curiosidade aleatória
*/quote* - Citação aleatória
*/sorte* - Números da sorte

*── 📈 FINANÇAS & MERCADO ─────────────────*

*/btc* - Preço Bitcoin
*/eth* - Preço Ethereum
*/crypto <symbol>* - Preço cripto
*/dolar* - Cotação dólar
*/euro* - Cotação euro

*── 🌍 INFO & CLIMA ───────────────────────*

*/tempo <cidade>* - Clima atual
*/trending* - Repos GitHub trending
*/news* - Notícias Hacker News
*/pais <nome>* - Info do país
*/fuso <cidade>* - Hora atual no fuso

*── 🔄 FEED AUTOMÁTICO ────────────────────*

*/feed* - Iniciar feed automático
*/parar* - Parar feed
    `;
    ctx.reply(helpText, { parse_mode: 'Markdown' });
  });

  // /npm <pacote>
  bot.command('npm', async (ctx) => {
    try {
      const pkg = ctx.message.text.split(' ').slice(1).join(' ');
      if (!pkg) return ctx.reply('❌ Use: /npm <pacote>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://registry.npmjs.org/${pkg}`, { timeout: 15000 });
      const data = response.data;
      const latest = data['dist-tags'].latest;
      const info = data.versions[latest];

      const text = `*${data.name}*\nVersão: ${latest}\nDescrição: ${info.description || 'N/A'}\nAutor: ${info.author?.name || 'N/A'}\nLicença: ${info.license || 'N/A'}\nDownloads semanais: ${data.downloads?.weekly || 'N/A'}\nHomepage: ${info.homepage || 'N/A'}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar pacote NPM.', { parse_mode: 'Markdown' });
    }
  });

  // /py <pacote>
  bot.command('py', async (ctx) => {
    try {
      const pkg = ctx.message.text.split(' ').slice(1).join(' ');
      if (!pkg) return ctx.reply('❌ Use: /py <pacote>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://pypi.org/pypi/${pkg}/json`, { timeout: 15000 });
      const data = response.data.info;

      const text = `*${data.name}*\nVersão: ${data.version}\nAutor: ${data.author}\nDescrição: ${data.summary}\nHomepage: ${data.home_page}\nPyPI: ${data.package_url}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar pacote PyPI.', { parse_mode: 'Markdown' });
    }
  });

  // /gh <usuario/repo>
  bot.command('gh', async (ctx) => {
    try {
      const repo = ctx.message.text.split(' ').slice(1).join(' ');
      if (!repo) return ctx.reply('❌ Use: /gh <usuario/repo>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://api.github.com/repos/${repo}`, {
        headers: { 'User-Agent': 'TelegramBot/1.0' },
        timeout: 15000
      });
      const data = response.data;

      const text = `*${data.name}*\nDescrição: ${data.description || 'N/A'}\nLinguagem: ${data.language || 'N/A'}\n⭐ Stars: ${data.stargazers_count}\n🍴 Forks: ${data.forks_count}\n🐛 Issues: ${data.open_issues_count}\nÚltima atualização: ${new Date(data.updated_at).toLocaleDateString('pt-BR')}\nLink: ${data.html_url}`;
      ctx.reply(text, { parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar repositório GitHub.', { parse_mode: 'Markdown' });
    }
  });

  // /ghuser <username>
  bot.command('ghuser', async (ctx) => {
    try {
      const username = ctx.message.text.split(' ').slice(1).join(' ');
      if (!username) return ctx.reply('❌ Use: /ghuser <username>', { parse_mode: 'Markdown' });

      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: { 'User-Agent': 'TelegramBot/1.0' },
        timeout: 15000
      });
      const data = response.data;

      const caption = `*${data.name || data.login}*\nBio: ${data.bio || 'N/A'}\nEmpresa: ${data.company || 'N/A'}\nLocalização: ${data.location || 'N/A'}\nRepos públicos: ${data.public_repos}\nSeguidores: ${data.followers}\nSeguindo: ${data.following}`;
      await ctx.replyWithPhoto(data.avatar_url, { caption, parse_mode: 'Markdown' });
    } catch (error) {
      ctx.reply('❌ Erro ao buscar usuário GitHub.', { parse_mode: 'Markdown' });
    }
  });

  // /mdn <termo>
  bot.command('mdn', (ctx) => {
    const termo = ctx.message.text.split(' ').slice(1).join(' ');
    if (!termo) return ctx.reply('❌ Use: /mdn <termo>', { parse_mode: 'Markdown' });

    const link = `https://developer.mozilla.org/pt-BR/search?q=${encodeURIComponent(termo)}`;
    ctx.reply(`🔍 [Buscar "${termo}" no MDN](${link})`, { parse_mode: 'Markdown' });
  });

  // /caniuse <feature>
  bot.command('caniuse', (ctx) => {
    const feature = ctx.message.text.split(' ').slice(1).join(' ');
    if (!feature) return ctx.reply('❌ Use: /caniuse <feature>', { parse_mode: 'Markdown' });

    const link = `https://caniuse.com/?search=${encodeURIComponent(feature)}`;
    ctx.reply(`🌐 [Ver suporte para "${feature}" no Can I Use](${link})`, { parse_mode: 'Markdown' });
  });

  // /color <hex>
  bot.command('color', (ctx) => {
    const hex = ctx.message.text.split(' ')[1];
    if (!hex || !/^#?[0-9a-fA-F]{6}$/.test(hex)) return ctx.reply('❌ Use: /color <hex> (ex: ff6b9d)', { parse_mode: 'Markdown' });

    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substr(0, 2), 16);
    const g = parseInt(cleanHex.substr(2, 2), 16);
    const b = parseInt(cleanHex.substr(4, 2), 16);

    // RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const l = (max + min) / 2;
    const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    const h = max === min ? 0 : max === rNorm ? (gNorm - bNorm) / (max - min) + (gNorm < bNorm ? 6 : 0) : max === gNorm ? (bNorm - rNorm) / (max - min) + 2 : (rNorm - gNorm) / (max - min) + 4;
    const hDeg = Math.round(h * 60);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);

    const text = `*Cor: #${cleanHex.toUpperCase()}*\nRGB: (${r}, ${g}, ${b})\nHSL: (${hDeg}°, ${sPct}%, ${lPct}%)`;
    ctx.reply(text, { parse_mode: 'Markdown' });
  });

  // /regex <padrão>
  bot.command('regex', (ctx) => {
    const pattern = ctx.message.text.split(' ').slice(1).join(' ');
    if (!pattern) return ctx.reply('❌ Use: /regex <padrão>', { parse_mode: 'Markdown' });

    // Dicionário simples
    const tokens = {
      '^': 'início da string',
      '$': 'fim da string',
      '\\d': 'dígito',
      '\\w': 'caractere alfanumérico',
      '\\s': 'espaço em branco',
      '.': 'qualquer caractere',
      '+': 'uma ou mais ocorrências',
      '*': 'zero ou mais ocorrências',
      '?': 'zero ou uma ocorrência',
      '[]': 'conjunto de caracteres',
      '{}': 'quantificador exato',
      '()': 'grupo',
      '|': 'ou'
    };

    let explanation = `Regex: \`${pattern}\`\n\n`;
    for (const [token, desc] of Object.entries(tokens)) {
      if (pattern.includes(token)) {
        explanation += `${token}: ${desc}\n`;
      }
    }
    if (explanation === `Regex: \`${pattern}\`\n\n`) {
      explanation += 'Padrão simples ou não reconhecido.';
    }
    ctx.reply(explanation, { parse_mode: 'Markdown' });
  });
};